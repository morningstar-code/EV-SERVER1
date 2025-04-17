interface TaskbarCircleProps {
    color?: string;
    icon?: string;
    fill?: number;
    radius?: number;
    fillFactor?: number;
    rotate?: number;
    transitionTime?: string;
}

interface CircleProps {
    color?: string;
    fill?: number;
    fillFactor?: number;
    radius?: number;
    rotate?: number;
    reverse?: boolean;
    show?: boolean;
    strokeWidth?: number;
    transitionTime?: string;
    excludeTransition?: boolean;
}