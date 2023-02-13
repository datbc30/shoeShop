import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

export default function FooterLayout({}: Props) {
  const navigate = useNavigate()
  return (
    <footer className="footer">
    <div className="footer-top  footer-element text-center">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="item">
              <h2>Get help</h2>
              <ul>
                <li>Home</li>
                <li>Nike</li>
                <li>Adidas</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 middle">
            <div className="item">
              <h2>Support</h2>
              <ul>
                <li>About</li>
                <li>Contact</li>
                <li>Help</li>
                <li>Phone</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="item">
              <h2>register</h2>
              <p onClick={() => {
                navigate('/register')
              }}>Register</p>
              <a onClick={()=> {
                navigate('/login')
              }}>Login</a>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="item">
              <h2>Contact</h2>
              <a onClick={()=> {
                navigate('/home')
              }}> + 0922973414</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom footer-element">
      <div className="container">
        <div className="text-footer text-center">
          <p>© 2022 Cybersoft All Rights Reserved | Design Theme by Vũ Thành Đạt.</p>
        </div>
      </div>
    </div>
  </footer>
  )
}