

export function isEqual(array1 : any[], array2 : any[]) : boolean{
    if(array1.length != array2.length){
        return false;
    }else{
        for(let i=0;i<array1.length;i++){
            if(array1[i] != array2[i]){
                return false;
            }
        }
        return true;
    }
}

export function spacePadding(len : number){
    let s = "";
    for(let i=0;i<len;i++){
        s += " ";
    }
    return s;
}
export function isPrimitiveObject(item : object | any[]) : boolean{
    if (item instanceof Array) {
        return item.every((v) => (typeof v === "string" || typeof v === "number" || typeof v === "boolean"));
    }else{
        return Object.keys(item).every((key) => {
            const value = (<any>item)[key];
            return (typeof value === "string" || typeof value === "number" || typeof value === "boolean");
        })
    }
}
function toStringLineArray(item : any, name : string | null,padding : number) : string[] {
    const r : string[] = new Array();
    if (item instanceof Array) {
        if(isPrimitiveObject(item)){
            const center = item.map((v) => v.toString()).join(", ")
            const s = name == null ? `[ ${center} ]` : `${name} = [ ${center} ]` 
            r.push(spacePadding(padding) + s);
        }else{
            let left = name == null ? (spacePadding(padding) + "[") : (spacePadding(padding) + `${name} = [`) ;
            r.push(left);
            for (let i = 0; i < item.length; i++) {
                const center = toStringLineArray(item[i], null,padding+1);
                center.forEach((v) => r.push(v));
            }    
            let right = spacePadding(padding) + "[";
            r.push(right);

        }
    } else {
        if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
            if(name == null){
                const s = spacePadding(padding) + item.toString();
                r.push(s);
            }else{
                const s = `${spacePadding(padding)}${name} = ${item.toString()}`;
                r.push(s);
            }
        } else if (typeof item === "object") {
            if(isPrimitiveObject(item)){
                const center = Object.keys(item).map((key) => `${key} = ${(item[key]).toString()}`).join(", ")
                const s = name == null ? `{ ${center} }` : `${name} = { ${center} }` 
                r.push(spacePadding(padding) + s);
            }else{
                let left = name == null ? (spacePadding(padding) + "{") : (spacePadding(padding) + `${name} = {`) ;
                r.push(left);
                Object.keys(item).forEach((key) => {
                    const value = item[key];
                    const center = toStringLineArray(value, key.toString(), padding+1);
                    center.forEach((v) => r.push(v));
                })
                let right = spacePadding(padding) + "}";
                r.push(right);    
            }

        }
    }
    return r;
}
export function toStringLines(item : any) : string {
    const r : string[] = toStringLineArray(item, null, 0);
    return r.join("\n");
}