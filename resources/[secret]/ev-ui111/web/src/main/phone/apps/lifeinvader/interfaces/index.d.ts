interface LifeInvaderContact {
    id: number;
    name: string;
    email: string;
}

interface LifeInvaderEmail {
    id: number;
    sender: string;
    to: string;
    title: string;
    body: string;
    category: string;
    timestamp: number;
    cc: any; //string[] | string;
}

interface LifeInvaderCategory {
    id: string;
}