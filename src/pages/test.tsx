import * as React from 'react';

type UserProfile = {
  id: number;
  name: string;
  email: string;
}

export default function index() {

  const [userProfile, setUserProfile] = React.useState<UserProfile>({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
  });

  const updateUserProfile = (updatedProfile: Partial<UserProfile>) => {

  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {userProfile.id}</p>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <hr />
      <button onClick={() => updateUserProfile({ name: 'Jane Doe' })}>Update Name to Jane Doe</button>
      <hr />
      <button onClick={() => updateUserProfile({ email: 'jane@example.com' })}>Update Email to jane@example.com</button>
    </div>
  );
}