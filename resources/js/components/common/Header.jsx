export default function Header() {
    return (
        <header className="ofw-header">
            <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Search" />
            </div>

            <div className="profile-wrapper">
                <div className="profile-info">
                    <p className="profile-name">Maria Martha Lee</p>
                    <p className="profile-status">Status: Registered</p>
                </div>
                <div className="profile-avatar"></div>
            </div>
        </header>
    );
}
