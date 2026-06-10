/* eslint-disable @typescript-eslint/naming-convention */

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const UmbralPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#F5F3FF',
            100: '#EDE9FE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#A78BFA',
            500: '#8B5CF6',
            600: '#7C3AED',
            700: '#6D28D9',
            800: '#5B21B6',
            900: '#4C1D95',
            950: '#2E1065',
        },

        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
            },

            dark: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#e5e7eb',
                    200: '#cbd5e1',
                    300: '#94a3b8',
                    400: '#64748b',
                    500: '#475569',
                    600: '#334155',
                    700: '#1f2937',
                    800: '#111827',
                    900: '#070A13',
                    950: '#03040A',
                },
            },
        },
    },
});