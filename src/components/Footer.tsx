
import React from "react";
import { useTranslation } from "react-i18next";
import { Icons } from "./icons";

const Footer = () => {
  const { t, i18n } = useTranslation(["common"]);
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t border-border" key={`footer-${i18n.language}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Icons.logo className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">ParaCollab</span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              {t("footer.description", "A collaborative platform for parachute game enthusiasts and communities to work together on global challenges.")}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">{t("footer.platform", "Platform")}</h3>
            <ul className="space-y-3 text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.platformLinks.features", "Features")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.platformLinks.projects", "Projects")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.platformLinks.token", "Token")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.platformLinks.governance", "Governance")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">{t("footer.resources", "Resources")}</h3>
            <ul className="space-y-3 text-foreground/70">
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.resourceLinks.documentation", "Documentation")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.resourceLinks.api", "API")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.resourceLinks.community", "Community")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("footer.resourceLinks.privacy", "Privacy")}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            {t("footer.copyright", "© {{year}} ParaCollab. All rights reserved.", { year: currentYear })}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              {t("footer.links.terms", "Terms")}
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              {t("footer.links.privacy", "Privacy")}
            </a>
            <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
              {t("footer.links.contact", "Contact")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
