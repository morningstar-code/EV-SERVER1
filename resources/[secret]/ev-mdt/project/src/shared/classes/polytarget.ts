export class PolyTarget {
    static addBoxZone(pId: string, pCenter: Vector3, pLength: number, pWidth: number, pOptions: any) {
        return global.exports["ev-polytarget"].AddBoxZone(pId, pCenter, pLength, pWidth, pOptions);
    }
    static addCircleZone(pId: string, pCenter: Vector3, pRadius: number, pOptions: any) {
        return global.exports["ev-polytarget"].AddCircleZone(pId, pCenter, pRadius, pOptions);
    }
}