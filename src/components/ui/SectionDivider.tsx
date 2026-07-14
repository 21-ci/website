import { Container } from "./Container";

export function SectionDivider() {
  return (
    <div aria-hidden="true">
      <Container>
        <div className="h-px bg-white/10" />
      </Container>
    </div>
  );
}
