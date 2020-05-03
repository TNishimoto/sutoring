export function getLibPath(): string | null {
    const isNode = (process.title !== 'browser');
    if(isNode){
        const env = process.env
        if (env.GTS_DEBUG == "TRUE" && env.GTS_SPATH === undefined) {
            throw Error("DEBUG ERROR");
        }
    
        const path = env.GTS_DEBUG == "TRUE" && env.GTS_SPATH !== undefined ? env.GTS_SPATH : "https://cdn.jsdelivr.net/npm/sutoring/docs/sutoring.js";
        return path;    
    }else{
        return null;
    }
}
