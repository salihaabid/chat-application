import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import noUserImg from '../assets/avatar.png';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className='p-2.5 border-b border-base-300'>
      {/* full row flex with space-between */}
      <div className='flex items-center justify-between w-full'>
        {/* Left side: avatar + info */}
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='size-10 rounded-full overflow-hidden'>
              <img
                src={selectedUser.profilePic || noUserImg}
                alt={selectedUser.name}
              />
            </div>
          </div>

          <div className='flex flex-col'>
            <h3 className='font-medium leading-tight'>{selectedUser.name}</h3>
            <p className='text-sm text-base-content/70 leading-tight'>
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Right side: close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className='p-2 hover:bg-base-300 rounded-full transition flex items-center justify-center cursor-pointer'
        >
          <X className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
