/**
 * The props object for the PageHeader component.
 *
 * @property {string} title - The title of the page.
 * @property {string} [description] - The description of the page.
 */
type PageHeaderProps = {
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The description of the page.
   */
  description?: string;
};

/**
 * The PageHeader component is used to display a title and optional description
 * at the top of a page. It is used in the protected routes to display the title
 * and description of the current page.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the page.
 * @param {string} [props.description] - The description of the page.
 */
export default function PageHeader({
  title,
  description,
}: Readonly<PageHeaderProps>) {
  return (
    <div className="flex flex-col space-y-1.5 py-6 border-b">
      {/* The title of the page is displayed in an h3 element with an uppercase font */}
      <h3 className="uppercase">{title}</h3>
      {/* The description of the page is displayed in a p element */}
      {description && <p>{description}</p>}
    </div>
  );
}
