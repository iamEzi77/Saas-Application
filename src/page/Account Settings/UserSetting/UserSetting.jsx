import "./UserSetting.css";

function UserSetting() {
  return (
    <section className="user-settings">
      <div className="main-container">
        <div className="main">
          <h1>User Settings</h1>
        </div>
        <button type="button">Save Changes</button>
      </div>

      <div className="section">
        <h2 className="section-title">Profile Settings</h2>

        <div className="profile-grid">
          <div className="avatar-block">
            <div className="avatar" aria-label="Profile image placeholder" />
            <button type="button">Change Image</button>
          </div>

          <div className="form">
            <div className="form-row">
              <label htmlFor="firstName">First Name:</label>
              <div className="input-wrap">
                <input
                  id="firstName"
                  type="text"
                  defaultValue="Chad"
                  placeholder="Enter your First Name"
                />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="lastName">Last Name:</label>
              <div className="input-wrap">
                <input
                  id="lastName"
                  type="text"
                  defaultValue="Meeks"
                  placeholder="Enter your Last Name"
                />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="nickName">Nick Name:</label>
              <div className="input-wrap">
                <input
                  id="nickName"
                  type="text"
                  defaultValue="Chad M"
                  placeholder="Enter your Nick Name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Account Settings</h2>

        <div className="form">
          <div className="form-row">
            <label htmlFor="username">User Name:</label>
            <div className="input-wrap">
              <input
                id="username"
                type="text"
                defaultValue="Chky071"
                placeholder="Enter your Username"
              />
            </div>
          </div>

          <div className="form-row">
            <label className="email" htmlFor="email">Email:</label>
            <div className="input-wrap">
              <input
                id="email"
                type="email"
                defaultValue="Chad@Meeksgrp.com"
                placeholder="Enter your Email"
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="accountPassword">Password:</label>
            <div className="input-wrap">
              <input
                id="accountPassword"
                type="password"
                defaultValue="password"
                placeholder="Enter your Password"
              />
              <span className="helper">Required to make changes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Change Password</h2>

        <div className="form">
          <div className="form-row">
            <label htmlFor="newPassword">New Password:</label>
            <div className="input-wrap">
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="repeatPassword">Repeat Password:</label>
            <div className="input-wrap">
              <input
                id="repeatPassword"
                type="password"
                placeholder="Repeat new password"
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="currentPassword">Current Password:</label>
            <div className="input-wrap">
              <input
                id="currentPassword"
                type="password"
                defaultValue="password"
                placeholder="Enter current password"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSetting;