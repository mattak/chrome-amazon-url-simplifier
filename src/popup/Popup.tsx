import { useState } from 'react'
import './Popup.css'

export const Popup = () => {
  const [simplifiedUrl, setSimplifiedUrl] = useState<string>('')

  const simplifyAmazonUrl = (url: string): string => {
    try {
      const urlObj = new URL(url)
      if (!urlObj.hostname.includes('amazon.co.jp')) {
        return 'Amazon.co.jpのURLではありません'
      }

      // dp/ の後の商品IDを抽出
      const dpMatch = urlObj.pathname.match(/\/dp\/([A-Z0-9]+)/)
      if (dpMatch) {
        return `https://www.amazon.co.jp/dp/${dpMatch[1]}/`
      }

      return '商品URLではありません'
    } catch (error) {
      return '無効なURLです'
    }
  }

  const handleClick = async () => {
    try {
      // 現在のタブの情報を取得
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab.url) {
        const simplified = simplifyAmazonUrl(tab.url)
        console.log('Original URL:', tab.url)
        console.log('Simplified URL:', simplified)
        setSimplifiedUrl(simplified)
      }
    } catch (error) {
      console.error('Error:', error)
      setSimplifiedUrl('エラーが発生しました')
    }
  }

  return (
    <main>
      <h3>Amazon URL Simplifier</h3>
      <button onClick={handleClick} className="simplify-button">
        URLを簡略化
      </button>
      {simplifiedUrl && (
        <div className="result">
          <p>{simplifiedUrl}</p>
        </div>
      )}
    </main>
  )
}

export default Popup
