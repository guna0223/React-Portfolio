import React from "react";
import "../components/css/Skills.css";

const Skills = () => {
  // Helper to generate pixel bars
  const generatePixelBar = (percentage) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round(percentage / 10);
    const bars = [];
    
    for (let i = 0; i < totalBlocks; i++) {
      if (i < filledBlocks) {
        bars.push(<div key={i} className="skill-bar-fill"></div>);
      } else {
        bars.push(<div key={i} className="skill-bar-fill empty"></div>);
      }
    }
    
    return bars;
  };

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">
          [ STATUS SCREEN ]
        </h2>

        <div className="skills-content">
          <div className="stats-container">
            <div className="stats-header">
              <div className="stats-title">◆ PLAYER STATS ◆</div>
              <div className="stats-level">HP: ████████ MP: ██████</div>
            </div>
            
            <div className="skills-grid">

              {/* Frontend */}
              <div className="skill-category">
                <div className="category-header">
                  <i className="fas fa-desktop"></i>
                  <h3>FRONTEND</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <i className="fab fa-html5" style={{color: '#e34c26'}}></i>
                    <span>HTML5</span>
                    <div className="skill-bar">
                      {generatePixelBar(95)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fab fa-css3-alt" style={{color: '#264de4'}}></i>
                    <span>CSS3</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fab fa-js-square" style={{color: '#f0db4f'}}></i>
                    <span>JavaScript</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fab fa-react" style={{color: '#61dafb'}}></i>
                    <span>React</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className="skill-category">
                <div className="category-header">
                  <i className="fas fa-server"></i>
                  <h3>BACKEND</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <i className="fab fa-python" style={{color: '#306998'}}></i>
                    <span>Python</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fas fa-dragon" style={{color: '#092e20'}}></i>
                    <span>Django</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Database */}
              <div className="skill-category">
                <div className="category-header">
                  <i className="fas fa-database"></i>
                  <h3>DATABASE</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <i className="fas fa-server" style={{color: '#00758f'}}></i>
                    <span>MySQL</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fas fa-table" style={{color: '#e48e00'}}></i>
                    <span>SQL</span>
                    <div className="skill-bar">
                      {generatePixelBar(80)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="skill-category">
                <div className="category-header">
                  <i className="fas fa-tools"></i>
                  <h3>TOOLS</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <i className="fab fa-git-alt" style={{color: '#f05032'}}></i>
                    <span>Git</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fab fa-github" style={{color: '#ffffff'}}></i>
                    <span>GitHub</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fas fa-code" style={{color: '#007acc'}}></i>
                    <span>VS Code</span>
                    <div className="skill-bar">
                      {generatePixelBar(95)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fas fa-terminal" style={{color: '#4af626'}}></i>
                    <span>CLI</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>
                </div>
              </div>

              {/* UI / UX */}
              <div className="skill-category">
                <div className="category-header">
                  <i className="fas fa-paint-brush"></i>
                  <h3>UI/UX</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <i className="fas fa-mobile-alt" style={{color: '#ff6b6b'}}></i>
                    <span>Responsive</span>
                    <div className="skill-bar">
                      {generatePixelBar(95)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fas fa-puzzle-piece" style={{color: '#9b59b6'}}></i>
                    <span>Components</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Frameworks */}
              <div className="skill-category">
                <div className="category-header">
                  <i className="fas fa-cubes"></i>
                  <h3>FRAMEWORKS</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <i className="fab fa-bootstrap" style={{color: '#7952b3'}}></i>
                    <span>Bootstrap</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fab fa-react" style={{color: '#61dafb'}}></i>
                    <span>React</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fas fa-dragon" style={{color: '#092e20'}}></i>
                    <span>Django</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <i className="fas fa-plug" style={{color: '#00d4ff'}}></i>
                    <span>REST APIs</span>
                    <div className="skill-bar">
                      {generatePixelBar(80)}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
