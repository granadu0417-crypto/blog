import Script from 'next/script';

interface WebSiteSchemaProps {
  url: string;
  name: string;
  description: string;
}

export function WebSiteSchema({ url, name, description }: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    publisher: {
      '@type': 'Person',
      name: 'kimyido',
      email: 'granadu0417@gmail.com',
    },
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  category,
  tags,
  imageUrl,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://kimyido.com/about',
    },
    publisher: {
      '@type': 'Person',
      name: 'kimyido',
      url: 'https://kimyido.com',
    },
    image: imageUrl || 'https://kimyido.com/og-image.png',
    articleSection: category,
    keywords: tags.join(', '),
    inLanguage: 'ko-KR',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description: string;
  email: string;
  socialLinks?: string[];
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  email,
  socialLinks = [],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: logo || `${url}/og-image.png`,
    description,
    email,
    sameAs: socialLinks,
    contactPoint: {
      '@type': 'ContactPoint',
      email,
      contactType: 'customer service',
      availableLanguage: 'Korean',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
