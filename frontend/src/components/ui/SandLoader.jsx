export default function SandLoader() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 150, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.3)' }}>
      <i className="fas fa-hourglass-half fa-spin" style={{ fontSize: '3rem', color: '#FFD700' }}></i>
    </div>
  );
}
