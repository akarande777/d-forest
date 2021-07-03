export const data: ({
    name: string;
    active: boolean;
    products?: undefined;
} | {
    name: string;
    active: boolean;
    products: {
        name: string;
        active: boolean;
    }[];
})[];
export namespace data2 {
    namespace c1 {
        const name: string;
        const active: boolean;
    }
    namespace c2 {
        const name_1: string;
        export { name_1 as name };
        const active_1: boolean;
        export { active_1 as active };
        export namespace products {
            namespace p1 {
                const name_2: string;
                export { name_2 as name };
                const active_2: boolean;
                export { active_2 as active };
            }
            namespace p2 {
                const name_3: string;
                export { name_3 as name };
                const active_3: boolean;
                export { active_3 as active };
            }
            namespace p3 {
                const name_4: string;
                export { name_4 as name };
                const active_4: boolean;
                export { active_4 as active };
            }
        }
    }
    namespace c3 {
        const name_5: string;
        export { name_5 as name };
        const active_5: boolean;
        export { active_5 as active };
        export namespace products_1 {
            export namespace p1_1 {
                const name_6: string;
                export { name_6 as name };
                const active_6: boolean;
                export { active_6 as active };
            }
            export { p1_1 as p1 };
            export namespace p2_1 {
                const name_7: string;
                export { name_7 as name };
                const active_7: boolean;
                export { active_7 as active };
            }
            export { p2_1 as p2 };
        }
        export { products_1 as products };
    }
}
export const data3: {
    name: string;
    active: boolean;
}[][];
