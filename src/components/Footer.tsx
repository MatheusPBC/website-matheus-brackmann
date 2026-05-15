import { SITE } from "@/consts";
import { type Locale } from "@/i18n/utils";
import { Container } from "./Container";

export function Footer({ locale }: { locale: Locale }) {
  const label = locale === "pt" ? "Feito por" : "Built by";

  return (
    <footer>
      <Container>
        <div className="text-sm opacity-75">{label} {SITE.NAME}</div>
      </Container>
    </footer>
  );
}
