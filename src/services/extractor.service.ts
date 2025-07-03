import textract from 'textract';
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

// export const extractTextFromFile = (file: Express.Multer.File): Promise<string> => {
//   const ext = path.extname(file.originalname).toLowerCase();

//   return new Promise((resolve, reject) => {
//     if (ext === '.docx') {
//       mammoth.extractRawText({ path: file.path })
//         .then(result => resolve(result.value))
//         .catch(err => {
//           console.error('❌ Error in mammoth extract:', err);
//           reject(err);
//         });
//     } else {
//       textract.fromFileWithPath(file.path, (err, text) => {
//         if (err) {
//           console.error('❌ Error in textract:', err);
//           reject(err);
//         } else {
//           resolve(text || '');
//         }
//       });
//     }
//   });
// };


export const extractTextFromFile = (file: Express.Multer.File): Promise<string> => {
  const ext = path.extname(file.originalname).toLowerCase();

  return new Promise((resolve, reject) => {
    if (ext === '.docx') {
      mammoth.extractRawText({ path: file.path })
        .then(result => resolve(result.value))
        .catch(reject);
    } else if (ext === '.txt') {
      fs.readFile(file.path, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    } else {
      textract.fromFileWithPath(file.path, (err, text) => {
        if (err) reject(err);
        else resolve(text || '');
      });
    }
  });
};