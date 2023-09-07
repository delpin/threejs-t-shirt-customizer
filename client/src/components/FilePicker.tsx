import { CustomButton } from ".";

interface Props {
  file?: File | undefined;
  setFile: (file: File | undefined) => void;
  readFile: (type: 'logo' | 'full') => void
}

const FilePicker = ({file, setFile, readFile}: Props) => {
  return (
    <div className="filepicker-container">
       <div className="flex-1 flex flex-col justify-between">
        <input id='file-upload' type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0])} />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload file
        </label>
        <p>
          {!file ? 'No file selected' : file.name}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <CustomButton type="outline" title="logo" handleClick={() => readFile('logo')} customStyles="text-xs" />
          <CustomButton type="filled" title="full" handleClick={() => readFile('full')} customStyles="text-xs" />
        </div>
       </div>
    </div>
  )
}

export default FilePicker