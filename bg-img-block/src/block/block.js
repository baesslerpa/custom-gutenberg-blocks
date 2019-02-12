/**
 * BLOCK: bg-img-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload, PlainText, URLInputButton, InnerBlocks } = wp.editor;
const { Button } = wp.components;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-bg-img-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'bg-img-block - SM Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [],
  attributes: {
    imageAlt: {
      attribute: 'alt',
      selector: '.bg-img'
    },
    imageUrl: {
      attribute: 'style',
      selector: '.bg-img'
    },
    url: {
      type: 'string',
    },
    text: {
      type: 'string'
    },
  },
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( { attributes, className, setAttributes }  ) {

    const getImageButton = (openEvent) => {
      if(attributes.imageUrl) {
        return (
          <img src={ attributes.imageUrl } onClick={ openEvent } className="image" />
        );
      }
      else {
        return (
          <div className="button-container">
            <Button onClick={ openEvent } className="button button-large">
              Bild oder Icon wählen
            </Button>
          </div>
        );
      }
    };

		return (
      <div className="container">
        <MediaUpload
          onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } }
          type="image"
          value={ attributes.imageID }
          render={ ({ open }) => getImageButton(open) }
        />

        <InnerBlocks />

        <URLInputButton
          url={ attributes.url }
          onChange={ ( url, post ) => setAttributes( { url, text: (post && post.title) || 'Click here' } ) }
        />
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( {attributes} ) {
		return (
      <a className="bg-img-wrap" href={attributes.url}>
  			<div className="bg-img" style={{backgroundImage: "url(" + attributes.imageUrl + ")"}}>
            <div className="bg-img-txt">
              <InnerBlocks.Content />
            </div>
  			</div>
      </a>
		);
	},
} );
