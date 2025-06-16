export interface MapItem {
  hospitalName: string;
  hospitalAddress: string;
  latitude: number;
  longitude: number;
}

export interface MapResponse {
  hospitals: MapItem[];
}

export type coordinate = {
  latitude: string;
  longitude: string;
};
