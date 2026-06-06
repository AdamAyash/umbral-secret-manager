/* eslint-disable @typescript-eslint/naming-convention */

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const UmbralPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#eef7ff',
            100: '#d9efff',
            200: '#b7e2ff',
            300: '#7ccfff',
            400: '#4863FA',
            500: '#06b6d4',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#13164F',
            950: '#1e1b4b',
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
                    800: '#030820',
                    900: '#0f172a',
                    950: '#020617',
                },
            },

            dark: {
                surface: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#e2e8f0',
                    200: '#cbd5e1',
                    300: '#94a3b8',
                    400: '#64748b',
                    500: '#475569',
                    600: '#334155',
                    700: '#1e293b',
                    800: '#0b1120',
                    900: '#030820',
                    950: '#020617',
                },
            },
        },
    },
});