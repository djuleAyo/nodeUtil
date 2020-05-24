import { promises as fs} from "fs";
import * as  path from "path";

export async function ftw(dirPath: string, cb: (file: string) => any): Promise<any> {
  // todo get rid of reqursion cause file tree may be large
  // todo add stop condition as callback
  let files = await fs.readdir(dirPath);

  let traversal = []
  for (const file of files) {
    let filePath = path.join(dirPath, file);
    let fileStat = await fs.stat(filePath);
    if (fileStat.isDirectory()) 
      traversal.push(ftw(filePath, cb))
    else  traversal.push(cb(filePath))
  }
  return Promise.all(traversal);
}
try {
  (async () => await ftw("./src", file => console.log(file)))()
} catch (error) {
  throw error;
}