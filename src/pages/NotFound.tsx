
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/translation/TranslationContext";

export default function NotFound() {
  const { t, currentLanguage } = useTranslation(["common"]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4" key={`not-found-${currentLanguage}`}>
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">
        {t("notFound", "Page Not Found")}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        {t("notFoundDescription", "The page you are looking for doesn't exist or has been moved.")}
      </p>
      <Button asChild>
        <Link to="/">{t("back", "Back to Home")}</Link>
      </Button>
    </div>
  );
}
