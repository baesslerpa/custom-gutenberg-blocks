/**
 * BLOCK: accordion
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload, PlainText, InnerBlocks } = wp.editor;
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
registerBlockType( 'cgb/block-accordion', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Accordion - SM Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [],
  attributes: {
    title: {
      source: 'text',
      selector: '.accordion'
    },
  },

	edit: function( { attributes, className, setAttributes } ) {
		// Creates a <p class='wp-block-cgb-block-accordion'></p>.
		return (
			<div className="acc-container">
        <PlainText
          onChange={ content => setAttributes({ title: content }) }
          value={ attributes.title }
          placeholder="Ueberschrift"
          className="accordion"
        />
      <hr/>
        <InnerBlocks />
			</div>
		);
	},

	save: function( {attributes} ) {
		return (
      <div class="accordion-wrap">
        <button class="accordion">{ attributes.title }</button>
        <div class="panel">
            <InnerBlocks.Content />
        </div>
      </div>
		);
	},
} );
