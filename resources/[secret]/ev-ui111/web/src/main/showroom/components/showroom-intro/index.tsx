import { Typography } from "@mui/material";

export default (props: any) => {
    const shop = props.shop;

    return (
        <div className="start-container">
            <div className="rtl" style={{ backgroundColor: shop.primary }}>
                <Typography variant="h1" style={{ color: '#fff' }}>
                    {shop.name}
                </Typography>
            </div>
            <div className="ltr" style={{ backgroundColor: shop.secondary }}>
                <Typography variant="h2" style={{ color: '#fff' }}>
                    Customer Experience
                </Typography>
                <div className="watermark">
                    <Typography variant="body1" style={{ color: '#fff' }}>
                        {'built with \xA0'} <span>{'\u2764️'}</span> {'\xA0 by Enhanced Reality Productions'}
                    </Typography>
                </div>
            </div>
        </div>
    )
}