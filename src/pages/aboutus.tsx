import '../css/aboutus.css'
import { PageProps } from '../functions/types';

const AboutUs = (props: PageProps) => {
    return (
      <div className='about-us-container'>
        <div className='about-us-header'>About Us:</div>
        <div className="bubble">
            <div className='message'>
            <p>Welcome to our housing planner and calculator!</p>
            <br></br>
            <p>We understand that purchasing a home can be a complex and stressful process.
                That's why we've created this tool to help you make informed decisions
                and take control of your home buying journey. Our housing planner and calculator has been designed to provide you with the tools you need to
                 plan, budget, and visualize your dream home.</p>
            </div>
            <div className='img'></div>
        </div>
      </div>
    )
  }
  export { AboutUs }