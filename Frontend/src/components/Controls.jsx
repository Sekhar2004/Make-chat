import { IoAttachOutline, IoMicOutline } from "react-icons/io5"
import { IoIosSend } from "react-icons/io"

const Controls = () => {
    return (
      <div className='flex gap-2 items-center'>
        <input type="text" className="bg-primary w-full p-1.5 outline-none px-2 rounded-md" placeholder="Write message" />
        {/* <Button variant="primary"><IoAttachOutline size={20} /></Button>
        <Button variant="primary"><IoMicOutline size={20} /></Button> */}
        <button className="bg-accent p-2 px-3 rounded-md hover:bg-accent/70"><IoIosSend size={20} /></button>
      </div>
    )
}

export default Controls