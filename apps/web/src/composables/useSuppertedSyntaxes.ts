export const useSupportedSyntaxes = () => {
    return useState<string[]>('supportedSyntaxes', () => {
        const raw = useRuntimeConfig().public.supportedSyntaxes;
        return raw ? JSON.parse(raw) : [];
    });
};