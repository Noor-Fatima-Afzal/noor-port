/**
 * Brand SVG paths via simple-icons (currentColor) so they match the theme.
 * LinkedIn and Microsoft are provided manually because some simple-icons
 * builds omit them from the named exports.
 */
import {
  siGoogle,
  siCoursera,
  siHuggingface,
  siKaggle,
  siHackerrank,
  siGithub,
  siMedium,
} from "simple-icons";

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

function makeIcon(path: string, defaultTitle: string) {
  return function BrandIcon({ title, ...props }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        role="img"
        aria-label={title ?? defaultTitle}
        {...props}
      >
        <title>{title ?? defaultTitle}</title>
        <path d={path} />
      </svg>
    );
  };
}

export const GoogleBrand = makeIcon(siGoogle.path, "Google");
export const CourseraBrand = makeIcon(siCoursera.path, "Coursera");
export const HuggingFaceBrand = makeIcon(siHuggingface.path, "Hugging Face");
export const KaggleBrand = makeIcon(siKaggle.path, "Kaggle");
export const HackerRankBrand = makeIcon(siHackerrank.path, "HackerRank");
export const GithubBrand = makeIcon(siGithub.path, "GitHub");
export const MediumBrand = makeIcon(siMedium.path, "Medium");

// LinkedIn (manual path, matches simple-icons design)
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
export const LinkedinBrand = makeIcon(LINKEDIN_PATH, "LinkedIn");

// Microsoft (four squares, official mark)
const MICROSOFT_PATH =
  "M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z";
export const MicrosoftBrand = makeIcon(MICROSOFT_PATH, "Microsoft");

// DeepLearning.AI logomark (stylized "DL" mark — fallback monogram)
export function DeepLearningBrand({ title, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      role="img"
      aria-label={title ?? "DeepLearning.AI"}
      {...props}
    >
      <title>{title ?? "DeepLearning.AI"}</title>
      <path d="M3 5h4.5L12 14.2 16.5 5H21l-7.2 14h-3.6L3 5Z" />
    </svg>
  );
}

export type BrandKey =
  | "google"
  | "microsoft"
  | "coursera"
  | "deeplearning"
  | "huggingface"
  | "kaggle"
  | "hackerrank";

export function BrandIcon({ brand, ...props }: { brand: BrandKey } & IconProps) {
  switch (brand) {
    case "google": return <GoogleBrand {...props} />;
    case "microsoft": return <MicrosoftBrand {...props} />;
    case "coursera": return <CourseraBrand {...props} />;
    case "deeplearning": return <DeepLearningBrand {...props} />;
    case "huggingface": return <HuggingFaceBrand {...props} />;
    case "kaggle": return <KaggleBrand {...props} />;
    case "hackerrank": return <HackerRankBrand {...props} />;
  }
}

