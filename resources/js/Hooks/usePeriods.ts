import { useEffect, useState } from "react";

export default function usePeriods() {
    const MONTHS = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    const [years, setYears] = useState<number[]>([]);
    const [alerts, setAlerts] = useState<string[]>([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear() + 1;
        const years = [];

        for (let i = currentYear; i >= currentYear - 5; i--) {
            years.push(i);
        }

        setYears(years);
    }, []);

    return {
        years,
        MONTHS,
        alerts,
        setAlerts,
    }
}
