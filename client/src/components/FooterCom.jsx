import { Footer, FooterDivider, FooterLinkGroup } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare, FaTwitterSquare } from "react-icons/fa";
import { SiAboutdotme } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500 ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex  md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <samp className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white ">
                Tech'S
              </samp>
              blog's
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 ">
            {/* bulid and about section inside the footer  */}
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/satishghode"
                  target="_blank"
                  rel="noopener onreferrer"
                >
                  Projects
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/satishghode"
                  target="_blank"
                  rel="noopener onreferrer"
                >
                  Projects
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/satishghode"
                  target="_blank"
                  rel="noopener onreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener onreferrer">
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/satishghode"
                  target="_blank"
                  rel="noopener onreferrer"
                >
                  Privacy policy
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/satishghode"
                  target="_blank"
                  rel="noopener onreferrer"
                >
                  Term &amp; Condition
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        {/* w-full sm:flex sm:items-center sm:justify-center */}
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Tech's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:mt-0  sm:justify-center">
            <Footer.Icon href='www.linkedin.com/in/satish-ghode' icon={FaLinkedin}/>
            <Footer.Icon href='https://github.com/satishghode' icon={FaGithubSquare}/>
            <Footer.Icon href='#' icon={SiAboutdotme}/>
            <Footer.Icon href='https://twitter.com/satishghode77' icon={FaTwitterSquare}/>
            <Footer.Icon href='#' icon={FaInstagram}/>

          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
