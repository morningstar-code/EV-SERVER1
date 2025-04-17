import Stat from "./stat";

export default (props: any) => {
    const selectedCar = props.selectedCar;
    const stats = props.stats;

    return (
        <div className="stats">
            <div className="make-model">
                <div className="brand-container">
                    <div className="veh-class">
                        {stats.vehClass}
                    </div>
                    <div className="brand">
                        {selectedCar.brand}
                    </div>
                    <div className="name">
                        {selectedCar.name}
                    </div>
                </div>
            </div>
            <div className="breakdowns">
                {stats.info.map((stat: any) => (
                    <Stat key={stat.name} stat={stat} />
                ))}
            </div>
        </div>
    )
}