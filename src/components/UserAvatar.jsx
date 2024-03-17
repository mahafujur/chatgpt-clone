

const UserAvatar = () => {


    const user = {
        name: 'Demo user', avatar: '/images/avatar.jpeg'
    }


    return (<div className="bottom-0 mt-auto flex flex-row flex-start gap-x-2 items-center">
            {/* User Avatar */}
            <img className="size-10 rounded-full" src={user.avatar} alt="User Avatar"/>
            {/* User Name */}
            <div className="text-lg font-semibold">{user.name}</div>

        </div>

    )

}

export default UserAvatar;
