/* Allow importing CSS files in react-bits examples without TS errors */
declare module "*.css" {
  const content: Record<string, string> | string
  export default content
}