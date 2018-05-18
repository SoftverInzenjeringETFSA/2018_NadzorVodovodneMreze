export interface Vodostaj {
    id: number;
    name: string;
    created_by: number;
    created_at: number; // unix timestamp
    deleted: boolean;
    location_id: string; //: 3,
    start_lat: string; //: 43.846233,
    start_lng: string; //: 18.340121,
    end_lat: string; //: 43.838872,
    end_lng: string; //: 18.342724
}