/* eslint-disable @typescript-eslint/naming-convention */

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const UmbralPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#11FCFA',
            100: '#11FCFA',
            200: '#11FCFA',
            300: '#11FCFA',
            400: '#11FCFA',
            500: '#11FCFA',
            600: '#11FCFA',
            700: '#11FCFA',
            800: '#11FCFA',
            900: '#11FCFA',
            950: '#11FCFA',
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
        components: {
            inputtext: {
                background: '#04071B',
                color: '#fef3c7',
                borderColor: 'rgba(255,255,255,0.10)',
                hoverBorderColor: 'rgba(34,211,238,0.45)',
                focusBorderColor: 'rgba(34,211,238,0.65)',
                placeholderColor: '#64748b',
                borderRadius: '0.75rem',
                paddingX: '0.875rem',
                paddingY: '0.625rem',
                shadow: 'none'
            }
        }
    },
});