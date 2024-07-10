import './Landing.css';

const Title = () => {
    return (
        <svg viewBox="0 0 600 100" className="title">
            <text x="50%" y="50%" fill="white" stroke="black" strokeWidth={2} textAnchor="middle" dominantBaseline="middle">
                Trevor Hatch
            </text>
        </svg>
    );
}

const AboutMe = () => {
    return (
        <div className="about-me">
            <h2>About Me</h2>
            <p>
            As a dedicated and highly motivated computer science 
            student at Texas A&M University, specializing in data 
            science and AI, I am passionate about leveraging 
            cutting-edge technologies to drive innovation and solve 
            complex problems. With a solid foundation in programming 
            languages such as Python, C++, and Java, I have developed 
            expertise in machine learning frameworks such as TensorFlow 
            and PyTorch, enabling me to apply advanced algorithms and 
            statistical models to extract valuable insights from data. 
            </p>
        </div>
    );
}

const Landing = () => {
    return (
        <div className='Landing'>
            <Title />
            <div className='row'>
                <div className='column image-column'>
                    <img src={require('.//assets/profile_img.jpg')} alt='Profile' className='profile-image' />
                </div>
                <div className='column about-column'>
                    <AboutMe />
                </div>
            </div>
            <div className='text-under'>HI</div>
        </div>
    );
}

export default Landing;
