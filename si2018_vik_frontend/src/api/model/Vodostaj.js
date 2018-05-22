export interface Vodostaj {
    id: number;
    value: number;
    created_by: number;
    created_at: number; // unix timestamp
    deleted: boolean;
   /* start_lat: number;
    start_lng: number;
    end_lat: number;
    end_lng: number;*/
    lat: number;
    lng: number;
}