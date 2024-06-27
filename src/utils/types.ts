export interface CitySelectorProps {
    city: string;
    setCity: (city: string) => void;
}
export interface WeatherData {
    temperature: {
        min: number;
        max: number;
    };
  }