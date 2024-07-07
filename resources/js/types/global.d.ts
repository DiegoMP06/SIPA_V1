import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
}

export type setDataByObject<TForm> = (data: TForm) => void;
export type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void;
export type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(key: K, value: TForm[K]) => void;
