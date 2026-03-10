export interface Step {
    id: number;
    label: string;
    short: string;
}

export interface FormData {
    lga: string;
    estate: string;
    street: string;
    tenureYears: string;
    power: number;
    flooding: number;
    roads: number;
    security: number;
    marketAccess: number;
    transport: number;
    transportCostRange: string;
    mtn: number;
    airtel: number;
    glo: number;
    mobile9: number;
    overallComment: string;
    anonymous: boolean;
}

export interface StarRatingProps {
    value: number;
    onChange: (value: number) => void;
    label: string;
    description: string;
    icon: string;
}

export interface NetworkRatingProps {
    carrier: string;
    value: number;
    onChange: (value: number) => void;
}

export interface NetworkCarrier {
    key: keyof Pick<FormData, 'mtn' | 'airtel' | 'glo' | 'mobile9'>;
    label: string;
    color: string;
}

