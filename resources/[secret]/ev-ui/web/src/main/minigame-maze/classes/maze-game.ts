export class MazeGame {
    width: number;
    height: number;
    cols: number;
    rows: number;
    maze: any;
    totalSteps: number;
    constructor(width: number, height: number) {
        this.width = void 0;
        this.height = void 0;
        this.cols = void 0;
        this.rows = void 0;
        this.maze = void 0;
        this.totalSteps = 0;

        this.width = width;
        this.height = height;
        this.cols = 2 * this.width + 1;
        this.rows = 2 * this.height + 1;
        this.maze = this.initArray([]);

        this.maze.forEach((row: any, mazeIndex: number) => {
            row.forEach((cell: any, rowIndex: number) => {
                mazeIndex % 2 === 1
                    ? (0 !== rowIndex && rowIndex !== this.cols - 1) ||
                    (this.maze[mazeIndex][rowIndex] = ['wall'])
                    : rowIndex % 2 === 0 &&
                    (this.maze[mazeIndex][rowIndex] = ['wall'])
            });

            if (mazeIndex === 1) {
                this.maze[mazeIndex][1] = ['door', 'entrance'];
            }

            if (mazeIndex === this.rows - 2) {
                this.maze[mazeIndex][this.cols - 2] = ['door', 'exit'];
            }
        });

        this.partition(1, this.height - 1, 1, this.width - 1);
    }

    initArray(value: any) {
        return new Array(this.rows).fill(null).map(() => {
            return new Array(this.cols).fill(value);
        });
    }

    rand(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    posToSpace(pos: number) {
        return 2 * (pos - 1) + 1;
    }

    posToWall(pos: number) {
        return 2 * pos;
    }

    inBounds(idx, p2) {
        return typeof this.maze[idx] !== 'undefined' && typeof this.maze[idx][p2] !== 'undefined';
    }

    shuffle(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIdx = Math.floor(Math.random() * (i + 1));
            const arr = [array[randomIdx], array[i]];
            array[i] = arr[0];
            array[randomIdx] = arr[1];
        }

        return array;
    }

    partition(_0x45d8da, _0x3d9ebe, _0x3f1bdd, _0x542cd7) {
        let _0x284caf,
            _0x2bccb6,
            _0x2b699e,
            _0x470522,
            _0x99b213,
            _0x4275bd

        if (_0x3d9ebe < _0x45d8da || _0x542cd7 < _0x3f1bdd) {
            return false
        }

        if (_0x45d8da === _0x3d9ebe) {
            _0x284caf = _0x45d8da;
        } else {
            _0x284caf = _0x45d8da;
            _0x2b699e = _0x45d8da + 1;
            _0x470522 = _0x3d9ebe - 1;
            _0x99b213 = Math.round(_0x2b699e + (_0x470522 - _0x2b699e) / 4);
            _0x4275bd = Math.round(_0x2b699e + (3 * (_0x470522 - _0x2b699e)) / 4);
            _0x284caf = this.rand(_0x99b213, _0x4275bd);
        }

        if (_0x3f1bdd === _0x542cd7) {
            _0x2bccb6 = _0x3f1bdd;
        } else {
            _0x2b699e = _0x3f1bdd + 1;
            _0x470522 = _0x542cd7 - 1;
            _0x99b213 = Math.round(_0x2b699e + (_0x470522 - _0x2b699e) / 3);
            _0x4275bd = Math.round(_0x2b699e + (2 * (_0x470522 - _0x2b699e)) / 3);
            _0x2bccb6 = this.rand(_0x99b213, _0x4275bd);
        }

        for (
            let i = this.posToWall(_0x45d8da) - 1;
            i <= this.posToWall(_0x3d9ebe) + 1;
            i++
        ) {
            for (
                let j = this.posToWall(_0x3f1bdd) - 1;
                j <= this.posToWall(_0x542cd7) + 1;
                j++
            ) {
                (i !== this.posToWall(_0x284caf) &&
                    j !== this.posToWall(_0x2bccb6)) ||
                    (this.maze[i][j] = ['wall']);
            }
        }

        const shuffled = this.shuffle([true, true, true, true]);

        if (shuffled[0]) {
            const rand = this.rand(_0x3f1bdd, _0x2bccb6);
            this.maze[this.posToWall(_0x284caf)][
                this.posToSpace(rand)
            ] = [];
        }

        if (shuffled[1]) {
            const rand = this.rand(_0x2bccb6 + 1, _0x542cd7 + 1);
            this.maze[this.posToWall(_0x284caf)][
                this.posToSpace(rand)
            ] = [];
        }

        if (shuffled[2]) {
            const rand = this.rand(_0x45d8da, _0x284caf)
            this.maze[this.posToSpace(rand)][
                this.posToWall(_0x2bccb6)
            ] = [];
        }

        if (shuffled[3]) {
            const rand = this.rand(_0x284caf + 1, _0x3d9ebe + 1)
            this.maze[this.posToSpace(rand)][
                this.posToWall(_0x2bccb6)
            ] = []
        }

        this.partition(
            _0x45d8da,
            _0x284caf - 1,
            _0x3f1bdd,
            _0x2bccb6 - 1
        )
        this.partition(
            _0x284caf + 1,
            _0x3d9ebe,
            _0x3f1bdd,
            _0x2bccb6 - 1
        )
        this.partition(
            _0x45d8da,
            _0x284caf - 1,
            _0x2bccb6 + 1,
            _0x542cd7
        )
        this.partition(
            _0x284caf + 1,
            _0x3d9ebe,
            _0x2bccb6 + 1,
            _0x542cd7
        )
    }

    isGap(...args: any) {
        let argLength = arguments.length;
        let argArray = new Array(argLength);

        for (let i = 0; i < argLength; i++) {
            argArray[i] = arguments[i];
        }

        return argArray.every((arg) => {
            return !(
                this.maze[arg[0]][arg[1]].length > 0 &&
                !this.maze[arg[0]][arg[1]].includes('door')
            )
        });
    }

    countSteps(p1, p2, p3, p4, p5, p6) {
        if (!this.inBounds(p2, p3)) {
            return false;
        }

        if (
            p1[p2][p3] &&
            p1[p2][p3] <= p4
        ) {
            return false;
        }

        if (!this.isGap([p2, p3])) {
            return false;
        }

        if (
            ((p1[p2][p3] = p4),
                this.maze[p2][p3].includes(p5))
        ) {
            return p6.unshift([p2, p3]), true;
        }

        let _0x5e1249 = [
            [p2 - 1, p3],
            [p2 + 1, p3],
            [p2, p3 - 1],
            [p2, p3 + 1],
        ];

        if (p4 < 12) {
            _0x5e1249.sort(() => Math.random() - 0.5);
        }

        let _0x3fc012 = this.countSteps(
            p1,
            _0x5e1249[2][0],
            _0x5e1249[2][1],
            p4 + 1,
            p5,
            p6
        );

        let _0x1cb556 = this.countSteps(
            p1,
            _0x5e1249[3][0],
            _0x5e1249[3][1],
            p4 + 1,
            p5,
            p6
        );

        let _0x3cfae8 = this.countSteps(
            p1,
            _0x5e1249[0][0],
            _0x5e1249[0][1],
            p4 + 1,
            p5,
            p6
        );

        let _0x45254f = this.countSteps(
            p1,
            _0x5e1249[1][0],
            _0x5e1249[1][1],
            p4 + 1,
            p5,
            p6
        );

        return _0x3fc012 || _0x1cb556 || _0x3cfae8 || _0x45254f
            ? (p6.push([p2, p3]), true)
            : void 0;
    }

    getSolution() {
        const solution = [];
        const arr = this.initArray(null);

        this.countSteps(arr, 1, 1, -1, 'exit', solution);

        return solution.reverse();
    }
}