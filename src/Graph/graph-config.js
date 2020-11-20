/*
  Example config for GraphView component
*/
import * as React from 'react';

export const NODE_KEY = 'id'; // Key used to identify nodes

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = 'customEmpty'; // Empty node type
export const POLY_TYPE = 'poly';
export const SPECIAL_TYPE = 'special';
export const SKINNY_TYPE = 'skinny';
export const SPECIAL_CHILD_SUBTYPE = 'specialChild';
export const EMPTY_EDGE_TYPE = 'emptyEdge';
export const SPECIAL_EDGE_TYPE = 'specialEdge';
export const COMPLEX_CIRCLE_TYPE = 'complexCircle';
export const CASSINI = 'Cassini';
export const CASSINI_DISABLED = 'Cassini_Disabled';
export const QUMRAN = 'Qumran';
export const QUMRAM_DISABLED = 'Qumran_Disabled';
export const TOMaHAWK = 'Tomahawk';
export const TOMaHAWK_DISABLED = 'Tomahawk_Disabled';

export const nodeTypes = [EMPTY_TYPE, POLY_TYPE, SPECIAL_TYPE, SKINNY_TYPE, CASSINI, CASSINI_DISABLED, QUMRAN, QUMRAM_DISABLED, TOMaHAWK, TOMaHAWK_DISABLED];
export const edgeTypes = [EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE];

const EmptyNodeShape = (
    <symbol viewBox="0 0 154 154" width="154" height="154" id="emptyNode">
        <circle cx="77" cy="77" r="76" />
    </symbol>
);

const CustomEmptyShape = (
    <symbol viewBox="0 0 100 100" id="customEmpty">
        <circle cx="50" cy="50" r="10" />
    </symbol>
);

const Cassini = (
    <symbol viewBox="0 0 200 88" width="200" height="88" id="cassini">
        <rect width="200" height="88"/>
    </symbol>
);

const Cassini_Disabled = (
    <symbol viewBox="0 0 200 88" width="200" height="88" id="cassini_disabled">
        <rect width="200" height="88" fill="rgb(220,220,220)"/>
    </symbol>
);

const Qumran = (
    <symbol viewBox="-27 0 154 154" id="qumran">
        <rect transform="translate(50) rotate(45)" width="109" height="109"/>
    </symbol>
);

const Qumran_Disabled = (
    <symbol viewBox="-27 0 154 154" id="qumran_disabled">
        <rect transform="translate(50) rotate(45)" width="109" height="109" fill="rgb(220,220,220)"/>
    </symbol>
);
const Tomahawk = (
    <symbol viewBox="0 0 88 72" id="tomahawk" width="88" height="88">
        <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z"/>
    </symbol>
);

const Tomahawk_Disabled = (
    <symbol viewBox="0 0 88 72" id="tomahawk_disabled" width="88" height="88">
        <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" fill="rgb(220,220,220)"/>
    </symbol>
);


const SpecialShape = (
    <symbol viewBox="-27 0 154 154" id="special" width="154" height="154">
        <rect transform="translate(50) rotate(45)" width="109" height="109" />
    </symbol>
);

const PolyShape = (
    <symbol viewBox="0 0 88 72" id="poly" width="88" height="88">
        <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
    </symbol>
);

const ComplexCircleShape = (
    <symbol viewBox="0 0 100 100" id="complexCircle" width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="transparent" stroke="transparent" />
        <circle cx="50" cy="50" r="34" />
        <path
            d="M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Zm0,90A40,40,0,1,1,90,50,40,40,0,0,1,50,90Z"
            data-intersect-ignore="true"
        />
    </symbol>
);

const SkinnyShape = (
    <symbol viewBox="0 0 154 54" width="154" height="54" id="skinny">
        <rect x="0" y="0" rx="2" ry="2" width="154" height="54" />
    </symbol>
);

const SpecialChildShape = (
    <symbol viewBox="0 0 154 154" id="specialChild">
        <rect
            x="2.5"
            y="0"
            width="154"
            height="154"
            fill="rgba(30, 144, 255, 0.12)"
        />
    </symbol>
);

const EmptyEdgeShape = (
    <symbol viewBox="0 0 50 50" id="emptyEdge">
        <circle cx="25" cy="25" r="8" fill="currentColor" />
    </symbol>
);

const SpecialEdgeShape = (
    <symbol viewBox="0 0 50 50" id="specialEdge">
        <rect
            transform="rotate(45)"
            x="27.5"
            y="-7.5"
            width="15"
            height="15"
            fill="currentColor"
        />
    </symbol>
);

export default {
    EdgeTypes: {
        emptyEdge: {
            shape: EmptyEdgeShape,
            shapeId: '#emptyEdge',
            strokeWidth: '10',
        },
        specialEdge: {
            shape: SpecialEdgeShape,
            shapeId: '#specialEdge',
        },
    },
    NodeSubtypes: {
        specialChild: {
            shape: SpecialChildShape,
            shapeId: '#specialChild',
        },
    },
    NodeTypes: {
        emptyNode: {
            shape: EmptyNodeShape,
            shapeId: '#emptyNode',
            typeText: 'Node',
        },
        empty: {
            shape: CustomEmptyShape,
            shapeId: '#empty',
            typeText: 'Node',
        },

        Cassini: {
            shape: Cassini,
            shapeId: '#cassini',
            typeText: 'Cassini',
        },

        Cassini_disabled: {
            shape: Cassini_Disabled,
            shapeId: '#cassini_disabled',
            typeText: 'Cassini',
        },
        Qumran: {
            shape: Qumran,
            shapeId: '#qumran',
            typeText: 'Qumran',
        },

        Qumran_disabled: {
            shape: Qumran_Disabled,
            shapeId: '#qumran_disabled',
            typeText: 'Qumran',
        },
        Tomahawk: {
            shape: Tomahawk,
            shapeId: '#tomahawk',
            typeText: 'Tomahawk',
        },

        Tomahawk_disabled: {
            shape: Tomahawk_Disabled,
            shapeId: '#tomahawk_disabled',
            typeText: 'Tomahawk',
        },

        special: {
            shape: SpecialShape,
            shapeId: '#special',
            typeText: 'Special',
        },
        skinny: {
            shape: SkinnyShape,
            shapeId: '#skinny',
            typeText: 'Skinny',
        },
        poly: {
            shape: PolyShape,
            shapeId: '#poly',
            typeText: 'Poly',
        },
        complexCircle: {
            shape: ComplexCircleShape,
            shapeId: '#complexCircle',
            typeText: '#complexCircle',
        },
    },
};