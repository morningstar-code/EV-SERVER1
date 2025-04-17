import Point from '../../../classes/point';
import cdt2d from 'cdt2d';
import { useEffect, useRef, useState } from 'react';

const untangleSettings = {

}

export default (props: any) => {
    const [canvasHeight, setCanvasHeight] = useState(640);
    const [canvasWidth, setCanvasWidth] = useState(640);

    const gameCanvasRef = useRef<HTMLCanvasElement>(null);
    const overPointRef = useRef<any>(null);
    const dragModeRef = useRef(false);
    //const finishedGameRef = useRef(false);
    const connectedWithOverPointRef = useRef<any>(false);
    const pointSizeRef = useRef(10);
    //const pointsCountRef = useRef(6); //10
    const intersectedCountRef = useRef(0);
    const linesRef = useRef<any>([]);
    const pointsRef = useRef<any>([]);
    const edgesRef = useRef<any>(null);

    const restartGame = () => {
        linesRef.current = [];
        edgesRef.current = null;
        //finishedGameRef.current = false;

        clearPoints();
        generatePoints();
        triangulate();
        arrangePoints();
        connectPoints();
        drawAllNodes();
    }

    const matchPoints = (checkPoint: any, mousePoint: any) => {
        if (mousePoint.x > checkPoint.x + pointSizeRef.current) {
            return false
        }
        if (mousePoint.x < checkPoint.x - pointSizeRef.current) {
            return false
        }
        if (mousePoint.y > checkPoint.y + pointSizeRef.current) {
            return false
        }
        if (mousePoint.y < checkPoint.y - pointSizeRef.current) {
            return false
        }
        return true
    }

    const clearCanvas = () => {
        const canvas = gameCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    const clearPoints = () => {
        pointsRef.current = [];
        clearCanvas();
    }

    const getMousePos = (e: any) => {
        const canvas = gameCanvasRef.current;
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left / (rect.right - rect.left) * canvasWidth,
            y: e.clientY - rect.top / (rect.bottom - rect.top) * canvasHeight
        };
    }

    const mouseUp = (e: any) => {
        let mouseUpPoint = getMousePos(e);
        //Might wanna use refs.
        if (dragModeRef.current && overPointRef.current) {
            dragPoint(overPointRef.current, mouseUpPoint);
            dragModeRef.current = false;
            pointsRef.current.forEach((point: any) => { drawCircle(point, pointSizeRef.current) });
            if (intersectedCountRef.current === 0 && !props.gameFinished) {
                //finishedGameRef.current = true;
                props.gameCallback(true);
            } else {
                connectedWithOverPointRef.current = false;
            }
        }
    }

    const dragPoint = (selectedPoint: any, newPoint: any) => {
        if (props.gameFinished) { return } //finishedGameRef.current
        pointsRef.current.map((pointToMove) => {
            if (pointToMove.x === selectedPoint.x && pointToMove.y === selectedPoint.y) {
                pointToMove.x = newPoint.x
                pointToMove.y = newPoint.y
                clearCanvas()
                drawAllNodes()
            }
        })
    }

    const mouseMove = (e: any) => {
        let point = getMousePos(e)
        // selectedPoint(point)
        if (dragModeRef.current && overPointRef.current) {
            dragPoint(overPointRef.current, point)
        }
    }

    const mouseDown = (e: any) => {
        let point = getMousePos(e)
        if (isMouseOnNode(point)) {
            findConnectedWithOverPoint()
            dragModeRef.current = true;
        } else {
            dragModeRef.current = false;
        }
    }

    const isMouseOnNode = (point: any) => {
        return selectedPoint(point) !== null
    }

    const selectedPoint = (point: any) => {
        for (var iteratedPoint of pointsRef.current) {
            if (matchPoints(iteratedPoint, point)) {
                overPointRef.current = iteratedPoint;
                return iteratedPoint
            }
        }
        overPointRef.current = null;
        return null
    }

    const addNode = (point: any) => {
        const canvas = gameCanvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.save()
        drawNode(point)
        ctx.restore()
        pointsRef.current.push(point)
    }

    const isIntersect = (line1: any, line2: any) => {
        // convert line1 to general form of line: Ax+By = C
        var a1 = line1.endPoint.y - line1.startPoint.y
        var b1 = line1.startPoint.x - line1.endPoint.x
        var c1 = a1 * line1.startPoint.x + b1 * line1.startPoint.y
        // convert line2 to general form of line: Ax+By = C
        var a2 = line2.endPoint.y - line2.startPoint.y
        var b2 = line2.startPoint.x - line2.endPoint.x
        var c2 = a2 * line2.startPoint.x + b2 * line2.startPoint.y
        // calculate the intersection point
        var d = a1 * b2 - a2 * b1
        // parallel when d is 0
        if (d === 0) {
            return false
        }
        // solve the interception point at (x, y)
        var x = (b2 * c1 - b1 * c2) / d
        var y = (a1 * c2 - a2 * c1) / d
        // check if the intersection point is on both line segments
        if ((isInBetween(line1.startPoint.x, x, line1.endPoint.x) || isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
            (isInBetween(line2.startPoint.x, x, line2.endPoint.x) || isInBetween(line2.startPoint.y, y, line2.endPoint.y))) {
            return true
        }
        // be default the given lines is not intersected.
        return false
    }

    const isInBetween = (a: any, b: any, c: any) => {
        // return false if b is almost equal to a or c.
        // this is to eliminate some floating point when
        // two value is equal to each other but different with 0.00000...0001
        if (Math.abs(a - b) < 0.000001 || Math.abs(b - c) < 0.000001) {
            return false
        }
        // true when b is in between a and c
        return (a < b && b < c) || (c < b && b < a)
    }

    const drawNode = (point: any) => {
        const canvas = gameCanvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.beginPath()
        ctx.moveTo(point.x - pointSizeRef.current, point.y - pointSizeRef.current)
        ctx.lineTo(point.x - pointSizeRef.current, point.y + pointSizeRef.current)
        ctx.lineTo(point.x + pointSizeRef.current, point.y + pointSizeRef.current)
        ctx.lineTo(point.x + pointSizeRef.current, point.y - pointSizeRef.current)
        ctx.lineTo(point.x - pointSizeRef.current, point.y - pointSizeRef.current)
        ctx.fillStyle = "#fff"
        ctx.fill()
        ctx.strokeStyle = "darkgrey"
        ctx.stroke()
    }

    const findConnectedWithOverPoint = () => {
        if (connectedWithOverPointRef.current && connectedWithOverPointRef.current.overPoint === overPointRef.current) { return }
        let connectedWithOverPoint1 = []
        linesRef.current.forEach(({ startPoint, endPoint, isIntersected }) => {
            if (startPoint === overPointRef.current) {
                connectedWithOverPoint1.push(endPoint)
            } else if (endPoint === overPointRef.current) {
                connectedWithOverPoint1.push(startPoint)
            }
        })

        connectedWithOverPointRef.current = { overPoint: overPointRef.current, connectedPoints: connectedWithOverPoint1 }
    }

    const isPointConnectWithOverPoint = (point: any) => {
        if (overPointRef.current === point) { return true }
        if (!connectedWithOverPointRef.current) { return false }
        if (connectedWithOverPointRef.current.connectedPoints && connectedWithOverPointRef.current.connectedPoints.includes(point)) {
            return true
        }
    }

    const drawCircle = (point: any, radius: number) => {
        const canvas = gameCanvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = isPointConnectWithOverPoint(point) && dragModeRef.current ? '#09f509' : '#09f509'
        ctx.beginPath()
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
    }

    const Line = (startPoint: any, endPoint: any, isIntersected: any) => {
        return {
            startPoint: startPoint,
            endPoint: endPoint,
            isIntersected: isIntersected
        }
    }

    const drawLine = (x1: any, y1: any, x2: any, y2: any, isIntersected: any) => {
        const canvas = gameCanvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineWidth = 2
        ctx.strokeStyle = isIntersected ? '#f02505' : '#09f509'
        ctx.stroke()
    }

    const generatePoints = () => {
        for (var i = 0; i < props.numPoints; i++) {
            var x = 30 + Math.floor(Math.random() * (canvasWidth - 60))
            var y = 30 + Math.floor(Math.random() * (canvasHeight - 60))
            pointsRef.current.push(new Point(x, y))
        }
    }

    const arrangePoints = () => {
        for (let i = 0; i < props.numPoints.current - 4; i++) {
            //let x = Math.floor((canvasWidth / 2) + 150 * Math.cos(2 * Math.PI * i / (props.numPoints - 4)))
            //let y = Math.floor((canvasHeight / 2) + 150 * Math.sin(2 * Math.PI * i / (props.numPoints - 4)))
            let x = Math.floor((canvasWidth / 2) + 150 * Math.cos(2 * Math.PI * i / (props.numPoints - 4)))
            let y = Math.floor((canvasHeight / 2) + 150 * Math.sin(2 * Math.PI * i / (props.numPoints - 4)))
            pointsRef.current[i] = new Point(x, y)
        }
        for (let i = 0; i < 4; i++) {
            //let x = Math.floor((canvasWidth / 2) + 70 * Math.cos(2 * Math.PI * i / 4))
            //let y = Math.floor((canvasHeight / 2) + 70 * Math.sin(2 * Math.PI * i / 4))
            let x = Math.floor((canvasWidth / 2) + 70 * Math.cos(2 * Math.PI * i / 4))
            let y = Math.floor((canvasHeight / 2) + 70 * Math.sin(2 * Math.PI * i / 4))
            pointsRef.current[props.numPoints - i - 1] = new Point(x, y)
        }
    }

    const connectPoints = () => {
        linesRef.current = []
        edgesRef.current.forEach(([a, b]) => {
            linesRef.current.push({
                startPoint: pointsRef.current[a],
                endPoint: pointsRef.current[b],
                isIntersected: false
            })
        })
    }

    const triangulate = () => {
        // use cdt2d to draw Delaunay Triangulation to ensure a planar graph
        // var points = [ [-2, -2], [-2, 2], [2, 2], [2, -2], [1, 0], [0, 1], [-1, 0], [0, -1] ]
        linesRef.current = []
        var coordinates = pointsRef.current.map(({ x, y }) => { return [x, y] })
        var triangles = cdt2d(coordinates, edgesRef.current || [], { exterior: true })
        var gennedEdges = []
        triangles.forEach(([a, b, c]) => {
            gennedEdges.push([a, b])
            gennedEdges.push([b, c])
            gennedEdges.push([c, a])
        })
        if (!edgesRef.current) {
            edgesRef.current = gennedEdges;
        }
    }

    const updateLineIntersection = () => {
        intersectedCountRef.current = 0;
        for (var i = 0; i < linesRef.current.length; i++) {
            let line1 = linesRef.current[i]
            line1.isIntersected = false
            for (var j = 0; j < i; j++) {
                var line2 = linesRef.current[j]
                // we check if two lines are intersected and bold the line if they are.
                if (isIntersect(line1, line2)) {
                    intersectedCountRef.current = intersectedCountRef.current + 1
                    line1.isIntersected = true
                    line2.isIntersected = true
                    linesRef.current[i] = line1
                    linesRef.current[j] = line2
                }
            }
        }
    }

    const drawAllLines = () => {
        updateLineIntersection()
        linesRef.current.forEach(({ startPoint, endPoint, isIntersected }) => {
            drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, isIntersected)
        })
    }

    const drawAllNodes = () => {
        const canvas = gameCanvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.save()

        connectPoints()
        drawAllLines()

        for (let point of pointsRef.current) {
            drawCircle(point, pointSizeRef.current)
        }

        ctx.restore()
    }

    useEffect(() => {
        restartGame()
    }, [])

    return (
        <div id="layers">
            <canvas
                id="game"
                width="640"
                height="640"
                ref={gameCanvasRef}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                onMouseMove={mouseMove}
            />
        </div>
    )
}