import './Popup.css'

export const Popup = () => {
  const handleClick = () => {
    console.log('OK')
  }

  return (
    <main>
      <h3>Amazon URL Simplifier</h3>
      <button onClick={handleClick} className="simplify-button">
        URLを簡略化
      </button>
    </main>
  )
}

export default Popup
