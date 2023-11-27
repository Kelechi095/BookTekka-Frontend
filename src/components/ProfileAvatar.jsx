

const ProfileAvatar = ({profilePicture}) => {
  return (
    <img className="rounded-full h-5 w-5 object-cover"  alt="Avatar" src={profilePicture}/>
  )
}

export default ProfileAvatar