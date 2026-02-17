import React from "react";
import "../components/css/Skills.css"; // adjust if needed

const Skills = () => {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">
          <span className="title-icon">🔮</span>
          Arcane Skills
        </h2>

        <div className="skills-content">
          <div className="skills-grid">

            {/* Frontend */}
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <i className="fas fa-eye"></i>
                <h3>Frontend Mysticism</h3>
              </div>

              <div className="skill-items">
                <div className="skill-item">
                  <i className="fab fa-html5 html"></i>
                  <span>HTML5</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "95%" }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <i className="fab fa-css3-alt css"></i>
                  <span>CSS3</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "90%" }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <i className="fab fa-js-square javascript"></i>
                  <span>JavaScript</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>

                {/* ADDED */}
                <div className="skill-item">
                  <i className="fab fa-react react"></i>
                  <span>React UI</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <i className="fas fa-hat-wizard"></i>
                <h3>Backend Enchantments</h3>
              </div>

              <div className="skill-items">
                <div className="skill-item">
                  <i className="fab fa-python python"></i>
                  <span>Python</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "90%" }}></div>
                  </div>
                </div>

                {/* ADDED */}
                <div className="skill-item">
                  <i className="fab fa-python django"></i>
                  <span>Django</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <i className="fas fa-database"></i>
                <h3>Data Vaults</h3>
              </div>

              <div className="skill-items">
                <div className="skill-item">
                  <i className="fas fa-server mysql"></i>
                  <span>MySQL</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>

                {/* ADDED */}
                <div className="skill-item">
                  <i className="fas fa-database"></i>
                  <span>SQL</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "80%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <i className="fas fa-wand-magic-sparkles"></i>
                <h3>Tools & Tech</h3>
              </div>

              <div className="skill-items">
                <div className="skill-item">
                  <i className="fab fa-git-alt git"></i>
                  <span>Git</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "90%" }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <i className="fab fa-github github"></i>
                  <span>GitHub</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "90%" }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <i className="fas fa-code vscode"></i>
                  <span>VS Code</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "95%" }}></div>
                  </div>
                </div>

                {/* ADDED */}
                <div className="skill-item">
                  <i className="fas fa-terminal"></i>
                  <span>CLI / Terminal</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* UI / UX */}
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <i className="fas fa-palette"></i>
                <h3>UI/UX Thaumaturgy</h3>
              </div>

              <div className="skill-items">
                <div className="skill-item">
                  <i className="fas fa-mobile-alt"></i>
                  <span>Responsive Design</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "95%" }}></div>
                  </div>
                </div>

                {/* ADDED */}
                <div className="skill-item">
                  <i className="fas fa-layer-group"></i>
                  <span>Component Design</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Frameworks */}
            <div className="skill-category animate-on-scroll">
              <div className="category-header">
                <i className="fas fa-book-spells"></i>
                <h3>Frameworks & Libraries</h3>
              </div>

              <div className="skill-items">
                <div className="skill-item">
                  <i className="fab fa-bootstrap bootstrap"></i>
                  <span>Bootstrap</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "90%" }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <i className="fab fa-react react"></i>
                  <span>React</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <i className="fab fa-python django"></i>
                  <span>Django</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "85%" }}></div>
                  </div>
                </div>

                {/* ADDED */}
                <div className="skill-item">
                  <i className="fas fa-plug"></i>
                  <span>REST APIs</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ "--fill": "80%" }}></div>
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
