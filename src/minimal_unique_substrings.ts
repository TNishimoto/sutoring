

//namespace StrFunctions {
    /**
     * This namespace provides functions for distinct substrings on a string.
     */
    export namespace DistinctSubstrings {
        export function sort(strings : string[]){
            strings.sort((a, b) => {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            })

        }

        export function enumerate(text: string) : string[] {
            const map = enumerateWithOccurrences(text);
            const r : string[] = new Array(0);
            map.forEach((value, key) =>{
                r.push(key);
            })
            DistinctSubstrings.sort(r);

            return r;
        }
        export function enumerateWithOccurrences(text : string) : Map<string, number[]>{
            let map = new Map<string, number[]>();
            for (let i = 0; i < text.length; i++) {
                for (let len = 1; len <= text.length - i; len++) {
                    const substr = text.substr(i, len);
                    if(map.has(substr)){
                        const occs = map.get(substr)!;
                        occs.push(i);
                        map.set(substr, occs );
                    }else{
                        map.set(substr,[i]);
                    }
                }
            }
            return map;

        }
    }

    /**
     * This namespace  provides functions for minimal unique substrings~(MUS).
     */
    export namespace MinimalUniqueSubstrings {
        export function enumerate(text : string) : string[]{
            const map = DistinctSubstrings.enumerateWithOccurrences(text);
            const r : string[] = new Array(0);
            map.forEach((occs, substr) =>{
                if(occs.length == 1){
                    if(substr.length == 1){
                        r.push(substr);
                    }else{
                        const left = substr.substr(1);
                        const right = substr.substr(0, substr.length-1);
                        if(map.get(left)!.length > 1 && map.get(right)!.length > 1){
                            r.push(substr);
                        }
                    }
                }
            })
            DistinctSubstrings.sort(r);

            return r;
            
        }
    }
//}