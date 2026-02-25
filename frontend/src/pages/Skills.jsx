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
                  <i className="fas fa-eye"></i>
                  <h3>FRONTEND</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <span>HTML5</span>
                    <div className="skill-bar">
                      {generatePixelBar(95)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <span>CSS3</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <span>JavaScript</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
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
                  <i className="fas fa-hat-wizard"></i>
                  <h3>BACKEND</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <span>Python</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
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
                    <span>MySQL</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
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
                  <i className="fas fa-wand-magic-sparkles"></i>
                  <h3>TOOLS</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <span>Git</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <span>GitHub</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <span>VS Code</span>
                    <div className="skill-bar">
                      {generatePixelBar(95)}
                    </div>
                  </div>

                  <div className="skill-item">
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
                  <i className="fas fa-palette"></i>
                  <h3>UI/UX</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <span>Responsive</span>
                    <div className="skill-bar">
                      {generatePixelBar(95)}
                    </div>
                  </div>

                  <div className="skill-item">
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
                  <i className="fas fa-book-spells"></i>
                  <h3>FRAMEWORKS</h3>
                </div>

                <div className="skill-items">
                  <div className="skill-item">
                    <span>Bootstrap</span>
                    <div className="skill-bar">
                      {generatePixelBar(90)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <span>React</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
                    <span>Django</span>
                    <div className="skill-bar">
                      {generatePixelBar(85)}
                    </div>
                  </div>

                  <div className="skill-item">
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
