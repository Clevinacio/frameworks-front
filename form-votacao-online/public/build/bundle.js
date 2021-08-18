
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_options(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            option.selected = ~value.indexOf(option.__value);
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.42.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    // ES6 Map
    var map;
    try {
      map = Map;
    } catch (_) { }
    var set;

    // ES6 Set
    try {
      set = Set;
    } catch (_) { }

    function baseClone (src, circulars, clones) {
      // Null/undefined/functions/etc
      if (!src || typeof src !== 'object' || typeof src === 'function') {
        return src
      }

      // DOM Node
      if (src.nodeType && 'cloneNode' in src) {
        return src.cloneNode(true)
      }

      // Date
      if (src instanceof Date) {
        return new Date(src.getTime())
      }

      // RegExp
      if (src instanceof RegExp) {
        return new RegExp(src)
      }

      // Arrays
      if (Array.isArray(src)) {
        return src.map(clone)
      }

      // ES6 Maps
      if (map && src instanceof map) {
        return new Map(Array.from(src.entries()))
      }

      // ES6 Sets
      if (set && src instanceof set) {
        return new Set(Array.from(src.values()))
      }

      // Object
      if (src instanceof Object) {
        circulars.push(src);
        var obj = Object.create(src);
        clones.push(obj);
        for (var key in src) {
          var idx = circulars.findIndex(function (i) {
            return i === src[key]
          });
          obj[key] = idx > -1 ? clones[idx] : baseClone(src[key], circulars, clones);
        }
        return obj
      }

      // ???
      return src
    }

    function clone (src) {
      return baseClone(src, [], [])
    }

    const toString$1 = Object.prototype.toString;
    const errorToString = Error.prototype.toString;
    const regExpToString = RegExp.prototype.toString;
    const symbolToString$1 = typeof Symbol !== 'undefined' ? Symbol.prototype.toString : () => '';
    const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;

    function printNumber(val) {
      if (val != +val) return 'NaN';
      const isNegativeZero = val === 0 && 1 / val < 0;
      return isNegativeZero ? '-0' : '' + val;
    }

    function printSimpleValue(val, quoteStrings = false) {
      if (val == null || val === true || val === false) return '' + val;
      const typeOf = typeof val;
      if (typeOf === 'number') return printNumber(val);
      if (typeOf === 'string') return quoteStrings ? `"${val}"` : val;
      if (typeOf === 'function') return '[Function ' + (val.name || 'anonymous') + ']';
      if (typeOf === 'symbol') return symbolToString$1.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
      const tag = toString$1.call(val).slice(8, -1);
      if (tag === 'Date') return isNaN(val.getTime()) ? '' + val : val.toISOString(val);
      if (tag === 'Error' || val instanceof Error) return '[' + errorToString.call(val) + ']';
      if (tag === 'RegExp') return regExpToString.call(val);
      return null;
    }

    function printValue(value, quoteStrings) {
      let result = printSimpleValue(value, quoteStrings);
      if (result !== null) return result;
      return JSON.stringify(value, function (key, value) {
        let result = printSimpleValue(this[key], quoteStrings);
        if (result !== null) return result;
        return value;
      }, 2);
    }

    let mixed = {
      default: '${path} is invalid',
      required: '${path} is a required field',
      oneOf: '${path} must be one of the following values: ${values}',
      notOneOf: '${path} must not be one of the following values: ${values}',
      notType: ({
        path,
        type,
        value,
        originalValue
      }) => {
        let isCast = originalValue != null && originalValue !== value;
        let msg = `${path} must be a \`${type}\` type, ` + `but the final value was: \`${printValue(value, true)}\`` + (isCast ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : '.');

        if (value === null) {
          msg += `\n If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
        }

        return msg;
      },
      defined: '${path} must be defined'
    };
    let string = {
      length: '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches: '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      uuid: '${path} must be a valid UUID',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string'
    };
    let number = {
      min: '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer'
    };
    let date = {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}'
    };
    let boolean = {
      isValue: '${path} field must be ${value}'
    };
    let object = {
      noUnknown: '${path} field has unspecified keys: ${unknown}'
    };
    let array$1 = {
      min: '${path} field must have at least ${min} items',
      max: '${path} field must have less than or equal to ${max} items',
      length: '${path} must be have ${length} items'
    };
    var locale = Object.assign(Object.create(null), {
      mixed,
      string,
      number,
      date,
      object,
      array: array$1,
      boolean
    });

    /** Used for built-in method references. */
    var objectProto$c = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty$9.call(object, key);
    }

    var _baseHas = baseHas;

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    var isArray_1 = isArray;

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    var _freeGlobal = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = _freeGlobal || freeSelf || Function('return this')();

    var _root = root;

    /** Built-in value references. */
    var Symbol$1 = _root.Symbol;

    var _Symbol = Symbol$1;

    /** Used for built-in method references. */
    var objectProto$b = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$b.toString;

    /** Built-in value references. */
    var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty$8.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];

      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }

    var _getRawTag = getRawTag;

    /** Used for built-in method references. */
    var objectProto$a = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto$a.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    var _objectToString = objectToString;

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? _getRawTag(value)
        : _objectToString(value);
    }

    var _baseGetTag = baseGetTag;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    var isObjectLike_1 = isObjectLike;

    /** `Object#toString` result references. */
    var symbolTag$1 = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
    }

    var isSymbol_1 = isSymbol;

    /** Used to match property names within property paths. */
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        reIsPlainProp = /^\w*$/;

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray_1(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol_1(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    var _isKey = isKey;

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject$2(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    var isObject_1 = isObject$2;

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag$1 = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject_1(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = _baseGetTag(value);
      return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    var isFunction_1 = isFunction;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = _root['__core-js_shared__'];

    var _coreJsData = coreJsData;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    var _isMasked = isMasked;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString$1.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    var _toSource = toSource;

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto$9 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty$7).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject_1(value) || _isMasked(value)) {
        return false;
      }
      var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
      return pattern.test(_toSource(value));
    }

    var _baseIsNative = baseIsNative;

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    var _getValue = getValue;

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = _getValue(object, key);
      return _baseIsNative(value) ? value : undefined;
    }

    var _getNative = getNative;

    /* Built-in method references that are verified to be native. */
    var nativeCreate = _getNative(Object, 'create');

    var _nativeCreate = nativeCreate;

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
      this.size = 0;
    }

    var _hashClear = hashClear;

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    var _hashDelete = hashDelete;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (_nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED$2 ? undefined : result;
      }
      return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
    }

    var _hashGet = hashGet;

    /** Used for built-in method references. */
    var objectProto$7 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
    }

    var _hashHas = hashHas;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    var _hashSet = hashSet;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = _hashClear;
    Hash.prototype['delete'] = _hashDelete;
    Hash.prototype.get = _hashGet;
    Hash.prototype.has = _hashHas;
    Hash.prototype.set = _hashSet;

    var _Hash = Hash;

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    var _listCacheClear = listCacheClear;

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    var eq_1 = eq;

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq_1(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    var _assocIndexOf = assocIndexOf;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    var _listCacheDelete = listCacheDelete;

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    var _listCacheGet = listCacheGet;

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return _assocIndexOf(this.__data__, key) > -1;
    }

    var _listCacheHas = listCacheHas;

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    var _listCacheSet = listCacheSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = _listCacheClear;
    ListCache.prototype['delete'] = _listCacheDelete;
    ListCache.prototype.get = _listCacheGet;
    ListCache.prototype.has = _listCacheHas;
    ListCache.prototype.set = _listCacheSet;

    var _ListCache = ListCache;

    /* Built-in method references that are verified to be native. */
    var Map$1 = _getNative(_root, 'Map');

    var _Map = Map$1;

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new _Hash,
        'map': new (_Map || _ListCache),
        'string': new _Hash
      };
    }

    var _mapCacheClear = mapCacheClear;

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    var _isKeyable = isKeyable;

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return _isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    var _getMapData = getMapData;

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = _getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    var _mapCacheDelete = mapCacheDelete;

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return _getMapData(this, key).get(key);
    }

    var _mapCacheGet = mapCacheGet;

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return _getMapData(this, key).has(key);
    }

    var _mapCacheHas = mapCacheHas;

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = _getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    var _mapCacheSet = mapCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = _mapCacheClear;
    MapCache.prototype['delete'] = _mapCacheDelete;
    MapCache.prototype.get = _mapCacheGet;
    MapCache.prototype.has = _mapCacheHas;
    MapCache.prototype.set = _mapCacheSet;

    var _MapCache = MapCache;

    /** Error message constants. */
    var FUNC_ERROR_TEXT = 'Expected a function';

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || _MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = _MapCache;

    var memoize_1 = memoize;

    /** Used as the maximum memoize cache size. */
    var MAX_MEMOIZE_SIZE = 500;

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize_1(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    var _memoizeCapped = memoizeCapped;

    /** Used to match property names within property paths. */
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

    /** Used to match backslashes in property paths. */
    var reEscapeChar = /\\(\\)?/g;

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = _memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    var _stringToPath = stringToPath;

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    var _arrayMap = arrayMap;

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
        symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray_1(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return _arrayMap(value, baseToString) + '';
      }
      if (isSymbol_1(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
    }

    var _baseToString = baseToString;

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : _baseToString(value);
    }

    var toString_1 = toString;

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray_1(value)) {
        return value;
      }
      return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
    }

    var _castPath = castPath;

    /** `Object#toString` result references. */
    var argsTag$2 = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike_1(value) && _baseGetTag(value) == argsTag$2;
    }

    var _baseIsArguments = baseIsArguments;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
      return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
        !propertyIsEnumerable$1.call(value, 'callee');
    };

    var isArguments_1 = isArguments;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    var _isIndex = isIndex;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    var isLength_1 = isLength;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol_1(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    var _toKey = toKey;

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = _castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = _toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength_1(length) && _isIndex(key, length) &&
        (isArray_1(object) || isArguments_1(object));
    }

    var _hasPath = hasPath;

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && _hasPath(object, path, _baseHas);
    }

    var has_1 = has;

    var isSchema = (obj => obj && obj.__isYupSchema__);

    class Condition {
      constructor(refs, options) {
        this.refs = refs;
        this.refs = refs;

        if (typeof options === 'function') {
          this.fn = options;
          return;
        }

        if (!has_1(options, 'is')) throw new TypeError('`is:` is required for `when()` conditions');
        if (!options.then && !options.otherwise) throw new TypeError('either `then:` or `otherwise:` is required for `when()` conditions');
        let {
          is,
          then,
          otherwise
        } = options;
        let check = typeof is === 'function' ? is : (...values) => values.every(value => value === is);

        this.fn = function (...args) {
          let options = args.pop();
          let schema = args.pop();
          let branch = check(...args) ? then : otherwise;
          if (!branch) return undefined;
          if (typeof branch === 'function') return branch(schema);
          return schema.concat(branch.resolve(options));
        };
      }

      resolve(base, options) {
        let values = this.refs.map(ref => ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context));
        let schema = this.fn.apply(base, values.concat(base, options));
        if (schema === undefined || schema === base) return base;
        if (!isSchema(schema)) throw new TypeError('conditions must return a schema object');
        return schema.resolve(options);
      }

    }

    function toArray(value) {
      return value == null ? [] : [].concat(value);
    }

    function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
    let strReg = /\$\{\s*(\w+)\s*\}/g;
    class ValidationError extends Error {
      static formatError(message, params) {
        const path = params.label || params.path || 'this';
        if (path !== params.path) params = _extends$3({}, params, {
          path
        });
        if (typeof message === 'string') return message.replace(strReg, (_, key) => printValue(params[key]));
        if (typeof message === 'function') return message(params);
        return message;
      }

      static isError(err) {
        return err && err.name === 'ValidationError';
      }

      constructor(errorOrErrors, value, field, type) {
        super();
        this.name = 'ValidationError';
        this.value = value;
        this.path = field;
        this.type = type;
        this.errors = [];
        this.inner = [];
        toArray(errorOrErrors).forEach(err => {
          if (ValidationError.isError(err)) {
            this.errors.push(...err.errors);
            this.inner = this.inner.concat(err.inner.length ? err.inner : err);
          } else {
            this.errors.push(err);
          }
        });
        this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
        if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
      }

    }

    const once = cb => {
      let fired = false;
      return (...args) => {
        if (fired) return;
        fired = true;
        cb(...args);
      };
    };

    function runTests(options, cb) {
      let {
        endEarly,
        tests,
        args,
        value,
        errors,
        sort,
        path
      } = options;
      let callback = once(cb);
      let count = tests.length;
      const nestedErrors = [];
      errors = errors ? errors : [];
      if (!count) return errors.length ? callback(new ValidationError(errors, value, path)) : callback(null, value);

      for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        test(args, function finishTestRun(err) {
          if (err) {
            // always return early for non validation errors
            if (!ValidationError.isError(err)) {
              return callback(err, value);
            }

            if (endEarly) {
              err.value = value;
              return callback(err, value);
            }

            nestedErrors.push(err);
          }

          if (--count <= 0) {
            if (nestedErrors.length) {
              if (sort) nestedErrors.sort(sort); //show parent errors after the nested ones: name.first, name

              if (errors.length) nestedErrors.push(...errors);
              errors = nestedErrors;
            }

            if (errors.length) {
              callback(new ValidationError(errors, value, path), value);
              return;
            }

            callback(null, value);
          }
        });
      }
    }

    var defineProperty = (function() {
      try {
        var func = _getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    var _defineProperty = defineProperty;

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && _defineProperty) {
        _defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    var _baseAssignValue = baseAssignValue;

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    var _createBaseFor = createBaseFor;

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = _createBaseFor();

    var _baseFor = baseFor;

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    var _baseTimes = baseTimes;

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    var stubFalse_1 = stubFalse;

    var isBuffer_1 = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? _root.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse_1;

    module.exports = isBuffer;
    });

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]',
        arrayTag$1 = '[object Array]',
        boolTag$1 = '[object Boolean]',
        dateTag$1 = '[object Date]',
        errorTag$1 = '[object Error]',
        funcTag = '[object Function]',
        mapTag$2 = '[object Map]',
        numberTag$1 = '[object Number]',
        objectTag$2 = '[object Object]',
        regexpTag$1 = '[object RegExp]',
        setTag$2 = '[object Set]',
        stringTag$1 = '[object String]',
        weakMapTag$1 = '[object WeakMap]';

    var arrayBufferTag$1 = '[object ArrayBuffer]',
        dataViewTag$2 = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
    typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
    typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
    typedArrayTags[errorTag$1] = typedArrayTags[funcTag] =
    typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
    typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
    typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] =
    typedArrayTags[weakMapTag$1] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike_1(value) &&
        isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
    }

    var _baseIsTypedArray = baseIsTypedArray;

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    var _baseUnary = baseUnary;

    var _nodeUtil = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && _freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    module.exports = nodeUtil;
    });

    /* Node.js helper references. */
    var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

    var isTypedArray_1 = isTypedArray;

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray_1(value),
          isArg = !isArr && isArguments_1(value),
          isBuff = !isArr && !isArg && isBuffer_1(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? _baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty$3.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               _isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    var _arrayLikeKeys = arrayLikeKeys;

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

      return value === proto;
    }

    var _isPrototype = isPrototype;

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    var _overArg = overArg;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = _overArg(Object.keys, Object);

    var _nativeKeys = nativeKeys;

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!_isPrototype(object)) {
        return _nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty$2.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    var _baseKeys = baseKeys;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength_1(value.length) && !isFunction_1(value);
    }

    var isArrayLike_1 = isArrayLike;

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
    }

    var keys_1 = keys;

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && _baseFor(object, iteratee, keys_1);
    }

    var _baseForOwn = baseForOwn;

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new _ListCache;
      this.size = 0;
    }

    var _stackClear = stackClear;

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    var _stackDelete = stackDelete;

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    var _stackGet = stackGet;

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    var _stackHas = stackHas;

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof _ListCache) {
        var pairs = data.__data__;
        if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new _MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    var _stackSet = stackSet;

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new _ListCache(entries);
      this.size = data.size;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = _stackClear;
    Stack.prototype['delete'] = _stackDelete;
    Stack.prototype.get = _stackGet;
    Stack.prototype.has = _stackHas;
    Stack.prototype.set = _stackSet;

    var _Stack = Stack;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    var _setCacheAdd = setCacheAdd;

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    var _setCacheHas = setCacheHas;

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new _MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
    SetCache.prototype.has = _setCacheHas;

    var _SetCache = SetCache;

    /**
     * A specialized version of `_.some` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    var _arraySome = arraySome;

    /**
     * Checks if a `cache` value for `key` exists.
     *
     * @private
     * @param {Object} cache The cache to query.
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function cacheHas(cache, key) {
      return cache.has(key);
    }

    var _cacheHas = cacheHas;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$5 = 1,
        COMPARE_UNORDERED_FLAG$3 = 2;

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Check that cyclic values are equal.
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new _SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!_arraySome(other, function(othValue, othIndex) {
                if (!_cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    var _equalArrays = equalArrays;

    /** Built-in value references. */
    var Uint8Array = _root.Uint8Array;

    var _Uint8Array = Uint8Array;

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    var _mapToArray = mapToArray;

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    var _setToArray = setToArray;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$4 = 1,
        COMPARE_UNORDERED_FLAG$2 = 2;

    /** `Object#toString` result references. */
    var boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        mapTag$1 = '[object Map]',
        numberTag = '[object Number]',
        regexpTag = '[object RegExp]',
        setTag$1 = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag$1 = '[object DataView]';

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol ? _Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag$1:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq_1(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag$1:
          var convert = _mapToArray;

        case setTag$1:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
          convert || (convert = _setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG$2;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    var _equalByTag = equalByTag;

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    var _arrayPush = arrayPush;

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
    }

    var _baseGetAllKeys = baseGetAllKeys;

    /**
     * A specialized version of `_.filter` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    var _arrayFilter = arrayFilter;

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    var stubArray_1 = stubArray;

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols;

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return _arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    var _getSymbols = getSymbols;

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return _baseGetAllKeys(object, keys_1, _getSymbols);
    }

    var _getAllKeys = getAllKeys;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$3 = 1;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
          objProps = _getAllKeys(object),
          objLength = objProps.length,
          othProps = _getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
          return false;
        }
      }
      // Check that cyclic values are equal.
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    var _equalObjects = equalObjects;

    /* Built-in method references that are verified to be native. */
    var DataView = _getNative(_root, 'DataView');

    var _DataView = DataView;

    /* Built-in method references that are verified to be native. */
    var Promise$1 = _getNative(_root, 'Promise');

    var _Promise = Promise$1;

    /* Built-in method references that are verified to be native. */
    var Set$1 = _getNative(_root, 'Set');

    var _Set = Set$1;

    /* Built-in method references that are verified to be native. */
    var WeakMap = _getNative(_root, 'WeakMap');

    var _WeakMap = WeakMap;

    /** `Object#toString` result references. */
    var mapTag = '[object Map]',
        objectTag$1 = '[object Object]',
        promiseTag = '[object Promise]',
        setTag = '[object Set]',
        weakMapTag = '[object WeakMap]';

    var dataViewTag = '[object DataView]';

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = _toSource(_DataView),
        mapCtorString = _toSource(_Map),
        promiseCtorString = _toSource(_Promise),
        setCtorString = _toSource(_Set),
        weakMapCtorString = _toSource(_WeakMap);

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = _baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (_Map && getTag(new _Map) != mapTag) ||
        (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
        (_Set && getTag(new _Set) != setTag) ||
        (_WeakMap && getTag(new _WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = _baseGetTag(value),
            Ctor = result == objectTag$1 ? value.constructor : undefined,
            ctorString = Ctor ? _toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    var _getTag = getTag;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$2 = 1;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        objectTag = '[object Object]';

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray_1(object),
          othIsArr = isArray_1(other),
          objTag = objIsArr ? arrayTag : _getTag(object),
          othTag = othIsArr ? arrayTag : _getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer_1(object)) {
        if (!isBuffer_1(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new _Stack);
        return (objIsArr || isTypedArray_1(object))
          ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new _Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new _Stack);
      return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    var _baseIsEqualDeep = baseIsEqualDeep;

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
        return value !== value && other !== other;
      }
      return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    var _baseIsEqual = baseIsEqual;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG$1 = 1,
        COMPARE_UNORDERED_FLAG$1 = 2;

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new _Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    var _baseIsMatch = baseIsMatch;

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject_1(value);
    }

    var _isStrictComparable = isStrictComparable;

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys_1(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, _isStrictComparable(value)];
      }
      return result;
    }

    var _getMatchData = getMatchData;

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    var _matchesStrictComparable = matchesStrictComparable;

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = _getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || _baseIsMatch(object, source, matchData);
      };
    }

    var _baseMatches = baseMatches;

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = _castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[_toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    var _baseGet = baseGet;

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : _baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    var get_1 = get;

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    var _baseHasIn = baseHasIn;

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && _hasPath(object, path, _baseHasIn);
    }

    var hasIn_1 = hasIn;

    /** Used to compose bitmasks for value comparisons. */
    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (_isKey(path) && _isStrictComparable(srcValue)) {
        return _matchesStrictComparable(_toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get_1(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn_1(object, path)
          : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    var _baseMatchesProperty = baseMatchesProperty;

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    var identity_1 = identity;

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    var _baseProperty = baseProperty;

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return _baseGet(object, path);
      };
    }

    var _basePropertyDeep = basePropertyDeep;

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
    }

    var property_1 = property;

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity_1;
      }
      if (typeof value == 'object') {
        return isArray_1(value)
          ? _baseMatchesProperty(value[0], value[1])
          : _baseMatches(value);
      }
      return property_1(value);
    }

    var _baseIteratee = baseIteratee;

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = _baseIteratee(iteratee);

      _baseForOwn(object, function(value, key, object) {
        _baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    var mapValues_1 = mapValues;

    /**
     * Based on Kendo UI Core expression code <https://github.com/telerik/kendo-ui-core#license-information>
     */

    function Cache(maxSize) {
      this._maxSize = maxSize;
      this.clear();
    }
    Cache.prototype.clear = function () {
      this._size = 0;
      this._values = Object.create(null);
    };
    Cache.prototype.get = function (key) {
      return this._values[key]
    };
    Cache.prototype.set = function (key, value) {
      this._size >= this._maxSize && this.clear();
      if (!(key in this._values)) this._size++;

      return (this._values[key] = value)
    };

    var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g,
      DIGIT_REGEX = /^\d+$/,
      LEAD_DIGIT_REGEX = /^\d/,
      SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,
      CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/,
      MAX_CACHE_SIZE = 512;

    var pathCache = new Cache(MAX_CACHE_SIZE),
      setCache = new Cache(MAX_CACHE_SIZE),
      getCache = new Cache(MAX_CACHE_SIZE);

    var propertyExpr = {
      Cache: Cache,

      split: split,

      normalizePath: normalizePath,

      setter: function (path) {
        var parts = normalizePath(path);

        return (
          setCache.get(path) ||
          setCache.set(path, function setter(obj, value) {
            var index = 0;
            var len = parts.length;
            var data = obj;

            while (index < len - 1) {
              var part = parts[index];
              if (
                part === '__proto__' ||
                part === 'constructor' ||
                part === 'prototype'
              ) {
                return obj
              }

              data = data[parts[index++]];
            }
            data[parts[index]] = value;
          })
        )
      },

      getter: function (path, safe) {
        var parts = normalizePath(path);
        return (
          getCache.get(path) ||
          getCache.set(path, function getter(data) {
            var index = 0,
              len = parts.length;
            while (index < len) {
              if (data != null || !safe) data = data[parts[index++]];
              else return
            }
            return data
          })
        )
      },

      join: function (segments) {
        return segments.reduce(function (path, part) {
          return (
            path +
            (isQuoted(part) || DIGIT_REGEX.test(part)
              ? '[' + part + ']'
              : (path ? '.' : '') + part)
          )
        }, '')
      },

      forEach: function (path, cb, thisArg) {
        forEach(Array.isArray(path) ? path : split(path), cb, thisArg);
      },
    };

    function normalizePath(path) {
      return (
        pathCache.get(path) ||
        pathCache.set(
          path,
          split(path).map(function (part) {
            return part.replace(CLEAN_QUOTES_REGEX, '$2')
          })
        )
      )
    }

    function split(path) {
      return path.match(SPLIT_REGEX)
    }

    function forEach(parts, iter, thisArg) {
      var len = parts.length,
        part,
        idx,
        isArray,
        isBracket;

      for (idx = 0; idx < len; idx++) {
        part = parts[idx];

        if (part) {
          if (shouldBeQuoted(part)) {
            part = '"' + part + '"';
          }

          isBracket = isQuoted(part);
          isArray = !isBracket && /^\d+$/.test(part);

          iter.call(thisArg, part, isBracket, isArray, idx, parts);
        }
      }
    }

    function isQuoted(str) {
      return (
        typeof str === 'string' && str && ["'", '"'].indexOf(str.charAt(0)) !== -1
      )
    }

    function hasLeadingNumber(part) {
      return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX)
    }

    function hasSpecialChars(part) {
      return SPEC_CHAR_REGEX.test(part)
    }

    function shouldBeQuoted(part) {
      return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part))
    }

    const prefixes = {
      context: '$',
      value: '.'
    };
    class Reference {
      constructor(key, options = {}) {
        if (typeof key !== 'string') throw new TypeError('ref must be a string, got: ' + key);
        this.key = key.trim();
        if (key === '') throw new TypeError('ref must be a non-empty string');
        this.isContext = this.key[0] === prefixes.context;
        this.isValue = this.key[0] === prefixes.value;
        this.isSibling = !this.isContext && !this.isValue;
        let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : '';
        this.path = this.key.slice(prefix.length);
        this.getter = this.path && propertyExpr.getter(this.path, true);
        this.map = options.map;
      }

      getValue(value, parent, context) {
        let result = this.isContext ? context : this.isValue ? value : parent;
        if (this.getter) result = this.getter(result || {});
        if (this.map) result = this.map(result);
        return result;
      }
      /**
       *
       * @param {*} value
       * @param {Object} options
       * @param {Object=} options.context
       * @param {Object=} options.parent
       */


      cast(value, options) {
        return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
      }

      resolve() {
        return this;
      }

      describe() {
        return {
          type: 'ref',
          key: this.key
        };
      }

      toString() {
        return `Ref(${this.key})`;
      }

      static isRef(value) {
        return value && value.__isYupRef;
      }

    } // @ts-ignore

    Reference.prototype.__isYupRef = true;

    function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

    function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    function createValidation(config) {
      function validate(_ref, cb) {
        let {
          value,
          path = '',
          label,
          options,
          originalValue,
          sync
        } = _ref,
            rest = _objectWithoutPropertiesLoose(_ref, ["value", "path", "label", "options", "originalValue", "sync"]);

        const {
          name,
          test,
          params,
          message
        } = config;
        let {
          parent,
          context
        } = options;

        function resolve(item) {
          return Reference.isRef(item) ? item.getValue(value, parent, context) : item;
        }

        function createError(overrides = {}) {
          const nextParams = mapValues_1(_extends$2({
            value,
            originalValue,
            label,
            path: overrides.path || path
          }, params, overrides.params), resolve);
          const error = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name);
          error.params = nextParams;
          return error;
        }

        let ctx = _extends$2({
          path,
          parent,
          type: name,
          createError,
          resolve,
          options,
          originalValue
        }, rest);

        if (!sync) {
          try {
            Promise.resolve(test.call(ctx, value, ctx)).then(validOrError => {
              if (ValidationError.isError(validOrError)) cb(validOrError);else if (!validOrError) cb(createError());else cb(null, validOrError);
            });
          } catch (err) {
            cb(err);
          }

          return;
        }

        let result;

        try {
          var _ref2;

          result = test.call(ctx, value, ctx);

          if (typeof ((_ref2 = result) == null ? void 0 : _ref2.then) === 'function') {
            throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. ` + `This test will finish after the validate call has returned`);
          }
        } catch (err) {
          cb(err);
          return;
        }

        if (ValidationError.isError(result)) cb(result);else if (!result) cb(createError());else cb(null, result);
      }

      validate.OPTIONS = config;
      return validate;
    }

    let trim = part => part.substr(0, part.length - 1).substr(1);

    function getIn(schema, path, value, context = value) {
      let parent, lastPart, lastPartDebug; // root path: ''

      if (!path) return {
        parent,
        parentPath: path,
        schema
      };
      propertyExpr.forEach(path, (_part, isBracket, isArray) => {
        let part = isBracket ? trim(_part) : _part;
        schema = schema.resolve({
          context,
          parent,
          value
        });

        if (schema.innerType) {
          let idx = isArray ? parseInt(part, 10) : 0;

          if (value && idx >= value.length) {
            throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. ` + `because there is no value at that index. `);
          }

          parent = value;
          value = value && value[idx];
          schema = schema.innerType;
        } // sometimes the array index part of a path doesn't exist: "nested.arr.child"
        // in these cases the current part is the next schema and should be processed
        // in this iteration. For cases where the index signature is included this
        // check will fail and we'll handle the `child` part on the next iteration like normal


        if (!isArray) {
          if (!schema.fields || !schema.fields[part]) throw new Error(`The schema does not contain the path: ${path}. ` + `(failed at: ${lastPartDebug} which is a type: "${schema._type}")`);
          parent = value;
          value = value && value[part];
          schema = schema.fields[part];
        }

        lastPart = part;
        lastPartDebug = isBracket ? '[' + _part + ']' : '.' + _part;
      });
      return {
        schema,
        parent,
        parentPath: lastPart
      };
    }

    class ReferenceSet {
      constructor() {
        this.list = new Set();
        this.refs = new Map();
      }

      get size() {
        return this.list.size + this.refs.size;
      }

      describe() {
        const description = [];

        for (const item of this.list) description.push(item);

        for (const [, ref] of this.refs) description.push(ref.describe());

        return description;
      }

      toArray() {
        return Array.from(this.list).concat(Array.from(this.refs.values()));
      }

      add(value) {
        Reference.isRef(value) ? this.refs.set(value.key, value) : this.list.add(value);
      }

      delete(value) {
        Reference.isRef(value) ? this.refs.delete(value.key) : this.list.delete(value);
      }

      has(value, resolve) {
        if (this.list.has(value)) return true;
        let item,
            values = this.refs.values();

        while (item = values.next(), !item.done) if (resolve(item.value) === value) return true;

        return false;
      }

      clone() {
        const next = new ReferenceSet();
        next.list = new Set(this.list);
        next.refs = new Map(this.refs);
        return next;
      }

      merge(newItems, removeItems) {
        const next = this.clone();
        newItems.list.forEach(value => next.add(value));
        newItems.refs.forEach(value => next.add(value));
        removeItems.list.forEach(value => next.delete(value));
        removeItems.refs.forEach(value => next.delete(value));
        return next;
      }

    }

    function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
    class BaseSchema {
      constructor(options) {
        this.deps = [];
        this.conditions = [];
        this._whitelist = new ReferenceSet();
        this._blacklist = new ReferenceSet();
        this.exclusiveTests = Object.create(null);
        this.tests = [];
        this.transforms = [];
        this.withMutation(() => {
          this.typeError(mixed.notType);
        });
        this.type = (options == null ? void 0 : options.type) || 'mixed';
        this.spec = _extends$1({
          strip: false,
          strict: false,
          abortEarly: true,
          recursive: true,
          nullable: false,
          presence: 'optional'
        }, options == null ? void 0 : options.spec);
      } // TODO: remove


      get _type() {
        return this.type;
      }

      _typeCheck(_value) {
        return true;
      }

      clone(spec) {
        if (this._mutate) {
          if (spec) Object.assign(this.spec, spec);
          return this;
        } // if the nested value is a schema we can skip cloning, since
        // they are already immutable


        const next = Object.create(Object.getPrototypeOf(this)); // @ts-expect-error this is readonly

        next.type = this.type;
        next._typeError = this._typeError;
        next._whitelistError = this._whitelistError;
        next._blacklistError = this._blacklistError;
        next._whitelist = this._whitelist.clone();
        next._blacklist = this._blacklist.clone();
        next.exclusiveTests = _extends$1({}, this.exclusiveTests); // @ts-expect-error this is readonly

        next.deps = [...this.deps];
        next.conditions = [...this.conditions];
        next.tests = [...this.tests];
        next.transforms = [...this.transforms];
        next.spec = clone(_extends$1({}, this.spec, spec));
        return next;
      }

      label(label) {
        var next = this.clone();
        next.spec.label = label;
        return next;
      }

      meta(...args) {
        if (args.length === 0) return this.spec.meta;
        let next = this.clone();
        next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
        return next;
      } // withContext<TContext extends AnyObject>(): BaseSchema<
      //   TCast,
      //   TContext,
      //   TOutput
      // > {
      //   return this as any;
      // }


      withMutation(fn) {
        let before = this._mutate;
        this._mutate = true;
        let result = fn(this);
        this._mutate = before;
        return result;
      }

      concat(schema) {
        if (!schema || schema === this) return this;
        if (schema.type !== this.type && this.type !== 'mixed') throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema.type}`);
        let base = this;
        let combined = schema.clone();

        const mergedSpec = _extends$1({}, base.spec, combined.spec); // if (combined.spec.nullable === UNSET)
        //   mergedSpec.nullable = base.spec.nullable;
        // if (combined.spec.presence === UNSET)
        //   mergedSpec.presence = base.spec.presence;


        combined.spec = mergedSpec;
        combined._typeError || (combined._typeError = base._typeError);
        combined._whitelistError || (combined._whitelistError = base._whitelistError);
        combined._blacklistError || (combined._blacklistError = base._blacklistError); // manually merge the blacklist/whitelist (the other `schema` takes
        // precedence in case of conflicts)

        combined._whitelist = base._whitelist.merge(schema._whitelist, schema._blacklist);
        combined._blacklist = base._blacklist.merge(schema._blacklist, schema._whitelist); // start with the current tests

        combined.tests = base.tests;
        combined.exclusiveTests = base.exclusiveTests; // manually add the new tests to ensure
        // the deduping logic is consistent

        combined.withMutation(next => {
          schema.tests.forEach(fn => {
            next.test(fn.OPTIONS);
          });
        });
        return combined;
      }

      isType(v) {
        if (this.spec.nullable && v === null) return true;
        return this._typeCheck(v);
      }

      resolve(options) {
        let schema = this;

        if (schema.conditions.length) {
          let conditions = schema.conditions;
          schema = schema.clone();
          schema.conditions = [];
          schema = conditions.reduce((schema, condition) => condition.resolve(schema, options), schema);
          schema = schema.resolve(options);
        }

        return schema;
      }
      /**
       *
       * @param {*} value
       * @param {Object} options
       * @param {*=} options.parent
       * @param {*=} options.context
       */


      cast(value, options = {}) {
        let resolvedSchema = this.resolve(_extends$1({
          value
        }, options));

        let result = resolvedSchema._cast(value, options);

        if (value !== undefined && options.assert !== false && resolvedSchema.isType(result) !== true) {
          let formattedValue = printValue(value);
          let formattedResult = printValue(result);
          throw new TypeError(`The value of ${options.path || 'field'} could not be cast to a value ` + `that satisfies the schema type: "${resolvedSchema._type}". \n\n` + `attempted value: ${formattedValue} \n` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ''));
        }

        return result;
      }

      _cast(rawValue, _options) {
        let value = rawValue === undefined ? rawValue : this.transforms.reduce((value, fn) => fn.call(this, value, rawValue, this), rawValue);

        if (value === undefined) {
          value = this.getDefault();
        }

        return value;
      }

      _validate(_value, options = {}, cb) {
        let {
          sync,
          path,
          from = [],
          originalValue = _value,
          strict = this.spec.strict,
          abortEarly = this.spec.abortEarly
        } = options;
        let value = _value;

        if (!strict) {
          // this._validating = true;
          value = this._cast(value, _extends$1({
            assert: false
          }, options)); // this._validating = false;
        } // value is cast, we can check if it meets type requirements


        let args = {
          value,
          path,
          options,
          originalValue,
          schema: this,
          label: this.spec.label,
          sync,
          from
        };
        let initialTests = [];
        if (this._typeError) initialTests.push(this._typeError);
        if (this._whitelistError) initialTests.push(this._whitelistError);
        if (this._blacklistError) initialTests.push(this._blacklistError);
        runTests({
          args,
          value,
          path,
          sync,
          tests: initialTests,
          endEarly: abortEarly
        }, err => {
          if (err) return void cb(err, value);
          runTests({
            tests: this.tests,
            args,
            path,
            sync,
            value,
            endEarly: abortEarly
          }, cb);
        });
      }

      validate(value, options, maybeCb) {
        let schema = this.resolve(_extends$1({}, options, {
          value
        })); // callback case is for nested validations

        return typeof maybeCb === 'function' ? schema._validate(value, options, maybeCb) : new Promise((resolve, reject) => schema._validate(value, options, (err, value) => {
          if (err) reject(err);else resolve(value);
        }));
      }

      validateSync(value, options) {
        let schema = this.resolve(_extends$1({}, options, {
          value
        }));
        let result;

        schema._validate(value, _extends$1({}, options, {
          sync: true
        }), (err, value) => {
          if (err) throw err;
          result = value;
        });

        return result;
      }

      isValid(value, options) {
        return this.validate(value, options).then(() => true, err => {
          if (ValidationError.isError(err)) return false;
          throw err;
        });
      }

      isValidSync(value, options) {
        try {
          this.validateSync(value, options);
          return true;
        } catch (err) {
          if (ValidationError.isError(err)) return false;
          throw err;
        }
      }

      _getDefault() {
        let defaultValue = this.spec.default;

        if (defaultValue == null) {
          return defaultValue;
        }

        return typeof defaultValue === 'function' ? defaultValue.call(this) : clone(defaultValue);
      }

      getDefault(options) {
        let schema = this.resolve(options || {});
        return schema._getDefault();
      }

      default(def) {
        if (arguments.length === 0) {
          return this._getDefault();
        }

        let next = this.clone({
          default: def
        });
        return next;
      }

      strict(isStrict = true) {
        var next = this.clone();
        next.spec.strict = isStrict;
        return next;
      }

      _isPresent(value) {
        return value != null;
      }

      defined(message = mixed.defined) {
        return this.test({
          message,
          name: 'defined',
          exclusive: true,

          test(value) {
            return value !== undefined;
          }

        });
      }

      required(message = mixed.required) {
        return this.clone({
          presence: 'required'
        }).withMutation(s => s.test({
          message,
          name: 'required',
          exclusive: true,

          test(value) {
            return this.schema._isPresent(value);
          }

        }));
      }

      notRequired() {
        var next = this.clone({
          presence: 'optional'
        });
        next.tests = next.tests.filter(test => test.OPTIONS.name !== 'required');
        return next;
      }

      nullable(isNullable = true) {
        var next = this.clone({
          nullable: isNullable !== false
        });
        return next;
      }

      transform(fn) {
        var next = this.clone();
        next.transforms.push(fn);
        return next;
      }
      /**
       * Adds a test function to the schema's queue of tests.
       * tests can be exclusive or non-exclusive.
       *
       * - exclusive tests, will replace any existing tests of the same name.
       * - non-exclusive: can be stacked
       *
       * If a non-exclusive test is added to a schema with an exclusive test of the same name
       * the exclusive test is removed and further tests of the same name will be stacked.
       *
       * If an exclusive test is added to a schema with non-exclusive tests of the same name
       * the previous tests are removed and further tests of the same name will replace each other.
       */


      test(...args) {
        let opts;

        if (args.length === 1) {
          if (typeof args[0] === 'function') {
            opts = {
              test: args[0]
            };
          } else {
            opts = args[0];
          }
        } else if (args.length === 2) {
          opts = {
            name: args[0],
            test: args[1]
          };
        } else {
          opts = {
            name: args[0],
            message: args[1],
            test: args[2]
          };
        }

        if (opts.message === undefined) opts.message = mixed.default;
        if (typeof opts.test !== 'function') throw new TypeError('`test` is a required parameters');
        let next = this.clone();
        let validate = createValidation(opts);
        let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;

        if (opts.exclusive) {
          if (!opts.name) throw new TypeError('Exclusive tests must provide a unique `name` identifying the test');
        }

        if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;
        next.tests = next.tests.filter(fn => {
          if (fn.OPTIONS.name === opts.name) {
            if (isExclusive) return false;
            if (fn.OPTIONS.test === validate.OPTIONS.test) return false;
          }

          return true;
        });
        next.tests.push(validate);
        return next;
      }

      when(keys, options) {
        if (!Array.isArray(keys) && typeof keys !== 'string') {
          options = keys;
          keys = '.';
        }

        let next = this.clone();
        let deps = toArray(keys).map(key => new Reference(key));
        deps.forEach(dep => {
          // @ts-ignore
          if (dep.isSibling) next.deps.push(dep.key);
        });
        next.conditions.push(new Condition(deps, options));
        return next;
      }

      typeError(message) {
        var next = this.clone();
        next._typeError = createValidation({
          message,
          name: 'typeError',

          test(value) {
            if (value !== undefined && !this.schema.isType(value)) return this.createError({
              params: {
                type: this.schema._type
              }
            });
            return true;
          }

        });
        return next;
      }

      oneOf(enums, message = mixed.oneOf) {
        var next = this.clone();
        enums.forEach(val => {
          next._whitelist.add(val);

          next._blacklist.delete(val);
        });
        next._whitelistError = createValidation({
          message,
          name: 'oneOf',

          test(value) {
            if (value === undefined) return true;
            let valids = this.schema._whitelist;
            return valids.has(value, this.resolve) ? true : this.createError({
              params: {
                values: valids.toArray().join(', ')
              }
            });
          }

        });
        return next;
      }

      notOneOf(enums, message = mixed.notOneOf) {
        var next = this.clone();
        enums.forEach(val => {
          next._blacklist.add(val);

          next._whitelist.delete(val);
        });
        next._blacklistError = createValidation({
          message,
          name: 'notOneOf',

          test(value) {
            let invalids = this.schema._blacklist;
            if (invalids.has(value, this.resolve)) return this.createError({
              params: {
                values: invalids.toArray().join(', ')
              }
            });
            return true;
          }

        });
        return next;
      }

      strip(strip = true) {
        let next = this.clone();
        next.spec.strip = strip;
        return next;
      }

      describe() {
        const next = this.clone();
        const {
          label,
          meta
        } = next.spec;
        const description = {
          meta,
          label,
          type: next.type,
          oneOf: next._whitelist.describe(),
          notOneOf: next._blacklist.describe(),
          tests: next.tests.map(fn => ({
            name: fn.OPTIONS.name,
            params: fn.OPTIONS.params
          })).filter((n, idx, list) => list.findIndex(c => c.name === n.name) === idx)
        };
        return description;
      }

    }
    // @ts-expect-error
    BaseSchema.prototype.__isYupSchema__ = true;

    for (const method of ['validate', 'validateSync']) BaseSchema.prototype[`${method}At`] = function (path, value, options = {}) {
      const {
        parent,
        parentPath,
        schema
      } = getIn(this, path, value, options.context);
      return schema[method](parent && parent[parentPath], _extends$1({}, options, {
        parent,
        path
      }));
    };

    for (const alias of ['equals', 'is']) BaseSchema.prototype[alias] = BaseSchema.prototype.oneOf;

    for (const alias of ['not', 'nope']) BaseSchema.prototype[alias] = BaseSchema.prototype.notOneOf;

    BaseSchema.prototype.optional = BaseSchema.prototype.notRequired;

    var isAbsent = (value => value == null);

    let rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i; // eslint-disable-next-line

    let rUrl = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i; // eslint-disable-next-line

    let rUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

    let isTrimmed = value => isAbsent(value) || value === value.trim();

    let objStringTag = {}.toString();
    function create$1() {
      return new StringSchema();
    }
    class StringSchema extends BaseSchema {
      constructor() {
        super({
          type: 'string'
        });
        this.withMutation(() => {
          this.transform(function (value) {
            if (this.isType(value)) return value;
            if (Array.isArray(value)) return value;
            const strValue = value != null && value.toString ? value.toString() : value;
            if (strValue === objStringTag) return value;
            return strValue;
          });
        });
      }

      _typeCheck(value) {
        if (value instanceof String) value = value.valueOf();
        return typeof value === 'string';
      }

      _isPresent(value) {
        return super._isPresent(value) && !!value.length;
      }

      length(length, message = string.length) {
        return this.test({
          message,
          name: 'length',
          exclusive: true,
          params: {
            length
          },

          test(value) {
            return isAbsent(value) || value.length === this.resolve(length);
          }

        });
      }

      min(min, message = string.min) {
        return this.test({
          message,
          name: 'min',
          exclusive: true,
          params: {
            min
          },

          test(value) {
            return isAbsent(value) || value.length >= this.resolve(min);
          }

        });
      }

      max(max, message = string.max) {
        return this.test({
          name: 'max',
          exclusive: true,
          message,
          params: {
            max
          },

          test(value) {
            return isAbsent(value) || value.length <= this.resolve(max);
          }

        });
      }

      matches(regex, options) {
        let excludeEmptyString = false;
        let message;
        let name;

        if (options) {
          if (typeof options === 'object') {
            ({
              excludeEmptyString = false,
              message,
              name
            } = options);
          } else {
            message = options;
          }
        }

        return this.test({
          name: name || 'matches',
          message: message || string.matches,
          params: {
            regex
          },
          test: value => isAbsent(value) || value === '' && excludeEmptyString || value.search(regex) !== -1
        });
      }

      email(message = string.email) {
        return this.matches(rEmail, {
          name: 'email',
          message,
          excludeEmptyString: true
        });
      }

      url(message = string.url) {
        return this.matches(rUrl, {
          name: 'url',
          message,
          excludeEmptyString: true
        });
      }

      uuid(message = string.uuid) {
        return this.matches(rUUID, {
          name: 'uuid',
          message,
          excludeEmptyString: false
        });
      } //-- transforms --


      ensure() {
        return this.default('').transform(val => val === null ? '' : val);
      }

      trim(message = string.trim) {
        return this.transform(val => val != null ? val.trim() : val).test({
          message,
          name: 'trim',
          test: isTrimmed
        });
      }

      lowercase(message = string.lowercase) {
        return this.transform(value => !isAbsent(value) ? value.toLowerCase() : value).test({
          message,
          name: 'string_case',
          exclusive: true,
          test: value => isAbsent(value) || value === value.toLowerCase()
        });
      }

      uppercase(message = string.uppercase) {
        return this.transform(value => !isAbsent(value) ? value.toUpperCase() : value).test({
          message,
          name: 'string_case',
          exclusive: true,
          test: value => isAbsent(value) || value === value.toUpperCase()
        });
      }

    }
    create$1.prototype = StringSchema.prototype; //
    // String Interfaces
    //

    /* eslint-disable */

    /**
     *
     * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
     * NON-CONFORMANT EDITION.
     * © 2011 Colin Snover <http://zetafleet.com>
     * Released under MIT license.
     */
    //              1 YYYY                 2 MM        3 DD              4 HH     5 mm        6 ss            7 msec         8 Z 9 ±    10 tzHH    11 tzmm
    var isoReg = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
    function parseIsoDate(date) {
      var numericKeys = [1, 4, 5, 6, 7, 10, 11],
          minutesOffset = 0,
          timestamp,
          struct;

      if (struct = isoReg.exec(date)) {
        // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
        for (var i = 0, k; k = numericKeys[i]; ++i) struct[k] = +struct[k] || 0; // allow undefined days and months


        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1; // allow arbitrary sub-second precision beyond milliseconds

        struct[7] = struct[7] ? String(struct[7]).substr(0, 3) : 0; // timestamps without timezone identifiers should be considered local time

        if ((struct[8] === undefined || struct[8] === '') && (struct[9] === undefined || struct[9] === '')) timestamp = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7]);else {
          if (struct[8] !== 'Z' && struct[9] !== undefined) {
            minutesOffset = struct[10] * 60 + struct[11];
            if (struct[9] === '+') minutesOffset = 0 - minutesOffset;
          }

          timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
        }
      } else timestamp = Date.parse ? Date.parse(date) : NaN;

      return timestamp;
    }

    // @ts-ignore
    let invalidDate = new Date('');

    let isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';
    class DateSchema extends BaseSchema {
      constructor() {
        super({
          type: 'date'
        });
        this.withMutation(() => {
          this.transform(function (value) {
            if (this.isType(value)) return value;
            value = parseIsoDate(value); // 0 is a valid timestamp equivalent to 1970-01-01T00:00:00Z(unix epoch) or before.

            return !isNaN(value) ? new Date(value) : invalidDate;
          });
        });
      }

      _typeCheck(v) {
        return isDate(v) && !isNaN(v.getTime());
      }

      prepareParam(ref, name) {
        let param;

        if (!Reference.isRef(ref)) {
          let cast = this.cast(ref);
          if (!this._typeCheck(cast)) throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
          param = cast;
        } else {
          param = ref;
        }

        return param;
      }

      min(min, message = date.min) {
        let limit = this.prepareParam(min, 'min');
        return this.test({
          message,
          name: 'min',
          exclusive: true,
          params: {
            min
          },

          test(value) {
            return isAbsent(value) || value >= this.resolve(limit);
          }

        });
      }

      max(max, message = date.max) {
        var limit = this.prepareParam(max, 'max');
        return this.test({
          message,
          name: 'max',
          exclusive: true,
          params: {
            max
          },

          test(value) {
            return isAbsent(value) || value <= this.resolve(limit);
          }

        });
      }

    }
    DateSchema.INVALID_DATE = invalidDate;

    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array == null ? 0 : array.length;

      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    var _arrayReduce = arrayReduce;

    /**
     * The base implementation of `_.propertyOf` without support for deep paths.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined : object[key];
      };
    }

    var _basePropertyOf = basePropertyOf;

    /** Used to map Latin Unicode letters to basic Latin letters. */
    var deburredLetters = {
      // Latin-1 Supplement block.
      '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
      '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
      '\xc7': 'C',  '\xe7': 'c',
      '\xd0': 'D',  '\xf0': 'd',
      '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
      '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
      '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
      '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
      '\xd1': 'N',  '\xf1': 'n',
      '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
      '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
      '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
      '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
      '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
      '\xc6': 'Ae', '\xe6': 'ae',
      '\xde': 'Th', '\xfe': 'th',
      '\xdf': 'ss',
      // Latin Extended-A block.
      '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
      '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
      '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
      '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
      '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
      '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
      '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
      '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
      '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
      '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
      '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
      '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
      '\u0134': 'J',  '\u0135': 'j',
      '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
      '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
      '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
      '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
      '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
      '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
      '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
      '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
      '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
      '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
      '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
      '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
      '\u0163': 't',  '\u0165': 't', '\u0167': 't',
      '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
      '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
      '\u0174': 'W',  '\u0175': 'w',
      '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
      '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
      '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
      '\u0132': 'IJ', '\u0133': 'ij',
      '\u0152': 'Oe', '\u0153': 'oe',
      '\u0149': "'n", '\u017f': 's'
    };

    /**
     * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
     * letters to basic Latin letters.
     *
     * @private
     * @param {string} letter The matched letter to deburr.
     * @returns {string} Returns the deburred letter.
     */
    var deburrLetter = _basePropertyOf(deburredLetters);

    var _deburrLetter = deburrLetter;

    /** Used to match Latin Unicode letters (excluding mathematical operators). */
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

    /** Used to compose unicode character classes. */
    var rsComboMarksRange$3 = '\\u0300-\\u036f',
        reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
        rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;

    /** Used to compose unicode capture groups. */
    var rsCombo$2 = '[' + rsComboRange$3 + ']';

    /**
     * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
     * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
     */
    var reComboMark = RegExp(rsCombo$2, 'g');

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString_1(string);
      return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
    }

    var deburr_1 = deburr;

    /** Used to match words composed of alphanumeric characters. */
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

    /**
     * Splits an ASCII `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }

    var _asciiWords = asciiWords;

    /** Used to detect strings that need a more robust regexp to match words. */
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

    /**
     * Checks if `string` contains a word composed of Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a word is found, else `false`.
     */
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }

    var _hasUnicodeWord = hasUnicodeWord;

    /** Used to compose unicode character classes. */
    var rsAstralRange$2 = '\\ud800-\\udfff',
        rsComboMarksRange$2 = '\\u0300-\\u036f',
        reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
        rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
        rsDingbatRange = '\\u2700-\\u27bf',
        rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
        rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
        rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
        rsPunctuationRange = '\\u2000-\\u206f',
        rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
        rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
        rsVarRange$2 = '\\ufe0e\\ufe0f',
        rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

    /** Used to compose unicode capture groups. */
    var rsApos$1 = "['\u2019]",
        rsBreak = '[' + rsBreakRange + ']',
        rsCombo$1 = '[' + rsComboRange$2 + ']',
        rsDigits = '\\d+',
        rsDingbat = '[' + rsDingbatRange + ']',
        rsLower = '[' + rsLowerRange + ']',
        rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
        rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
        rsModifier$1 = '(?:' + rsCombo$1 + '|' + rsFitz$1 + ')',
        rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
        rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsUpper = '[' + rsUpperRange + ']',
        rsZWJ$2 = '\\u200d';

    /** Used to compose unicode regexes. */
    var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
        rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
        rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?',
        rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?',
        reOptMod$1 = rsModifier$1 + '?',
        rsOptVar$1 = '[' + rsVarRange$2 + ']?',
        rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
        rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
        rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
        rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
        rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;

    /** Used to match complex or compound words. */
    var reUnicodeWord = RegExp([
      rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
      rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
      rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
      rsUpper + '+' + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join('|'), 'g');

    /**
     * Splits a Unicode `string` into an array of its words.
     *
     * @private
     * @param {string} The string to inspect.
     * @returns {Array} Returns the words of `string`.
     */
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }

    var _unicodeWords = unicodeWords;

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString_1(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    var words_1 = words;

    /** Used to compose unicode capture groups. */
    var rsApos = "['\u2019]";

    /** Used to match apostrophes. */
    var reApos = RegExp(rsApos, 'g');

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
      };
    }

    var _createCompounder = createCompounder;

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = _createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    var snakeCase_1 = snakeCase;

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    var _baseSlice = baseSlice;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : _baseSlice(array, start, end);
    }

    var _castSlice = castSlice;

    /** Used to compose unicode character classes. */
    var rsAstralRange$1 = '\\ud800-\\udfff',
        rsComboMarksRange$1 = '\\u0300-\\u036f',
        reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
        rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
        rsVarRange$1 = '\\ufe0e\\ufe0f';

    /** Used to compose unicode capture groups. */
    var rsZWJ$1 = '\\u200d';

    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$1 + rsVarRange$1 + ']');

    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }

    var _hasUnicode = hasUnicode;

    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function asciiToArray(string) {
      return string.split('');
    }

    var _asciiToArray = asciiToArray;

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff',
        rsComboMarksRange = '\\u0300-\\u036f',
        reComboHalfMarksRange = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange = '\\u20d0-\\u20ff',
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
        rsVarRange = '\\ufe0e\\ufe0f';

    /** Used to compose unicode capture groups. */
    var rsAstral = '[' + rsAstralRange + ']',
        rsCombo = '[' + rsComboRange + ']',
        rsFitz = '\\ud83c[\\udffb-\\udfff]',
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        rsNonAstral = '[^' + rsAstralRange + ']',
        rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsZWJ = '\\u200d';

    /** Used to compose unicode regexes. */
    var reOptMod = rsModifier + '?',
        rsOptVar = '[' + rsVarRange + ']?',
        rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }

    var _unicodeToArray = unicodeToArray;

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return _hasUnicode(string)
        ? _unicodeToArray(string)
        : _asciiToArray(string);
    }

    var _stringToArray = stringToArray;

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString_1(string);

        var strSymbols = _hasUnicode(string)
          ? _stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? _castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    var _createCaseFirst = createCaseFirst;

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = _createCaseFirst('toUpperCase');

    var upperFirst_1 = upperFirst;

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst_1(toString_1(string).toLowerCase());
    }

    var capitalize_1 = capitalize;

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = _createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize_1(word) : word);
    });

    var camelCase_1 = camelCase;

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = _baseIteratee(iteratee);

      _baseForOwn(object, function(value, key, object) {
        _baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    var mapKeys_1 = mapKeys;

    /**
     * Topological sorting function
     *
     * @param {Array} edges
     * @returns {Array}
     */

    var toposort_1 = function(edges) {
      return toposort(uniqueNodes(edges), edges)
    };

    var array = toposort;

    function toposort(nodes, edges) {
      var cursor = nodes.length
        , sorted = new Array(cursor)
        , visited = {}
        , i = cursor
        // Better data structures make algorithm much faster.
        , outgoingEdges = makeOutgoingEdges(edges)
        , nodesHash = makeNodesHash(nodes);

      // check for unknown nodes
      edges.forEach(function(edge) {
        if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
          throw new Error('Unknown node. There is an unknown node in the supplied edges.')
        }
      });

      while (i--) {
        if (!visited[i]) visit(nodes[i], i, new Set());
      }

      return sorted

      function visit(node, i, predecessors) {
        if(predecessors.has(node)) {
          var nodeRep;
          try {
            nodeRep = ", node was:" + JSON.stringify(node);
          } catch(e) {
            nodeRep = "";
          }
          throw new Error('Cyclic dependency' + nodeRep)
        }

        if (!nodesHash.has(node)) {
          throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: '+JSON.stringify(node))
        }

        if (visited[i]) return;
        visited[i] = true;

        var outgoing = outgoingEdges.get(node) || new Set();
        outgoing = Array.from(outgoing);

        if (i = outgoing.length) {
          predecessors.add(node);
          do {
            var child = outgoing[--i];
            visit(child, nodesHash.get(child), predecessors);
          } while (i)
          predecessors.delete(node);
        }

        sorted[--cursor] = node;
      }
    }

    function uniqueNodes(arr){
      var res = new Set();
      for (var i = 0, len = arr.length; i < len; i++) {
        var edge = arr[i];
        res.add(edge[0]);
        res.add(edge[1]);
      }
      return Array.from(res)
    }

    function makeOutgoingEdges(arr){
      var edges = new Map();
      for (var i = 0, len = arr.length; i < len; i++) {
        var edge = arr[i];
        if (!edges.has(edge[0])) edges.set(edge[0], new Set());
        if (!edges.has(edge[1])) edges.set(edge[1], new Set());
        edges.get(edge[0]).add(edge[1]);
      }
      return edges
    }

    function makeNodesHash(arr){
      var res = new Map();
      for (var i = 0, len = arr.length; i < len; i++) {
        res.set(arr[i], i);
      }
      return res
    }
    toposort_1.array = array;

    function sortFields(fields, excludes = []) {
      let edges = [];
      let nodes = [];

      function addNode(depPath, key) {
        var node = propertyExpr.split(depPath)[0];
        if (!~nodes.indexOf(node)) nodes.push(node);
        if (!~excludes.indexOf(`${key}-${node}`)) edges.push([key, node]);
      }

      for (const key in fields) if (has_1(fields, key)) {
        let value = fields[key];
        if (!~nodes.indexOf(key)) nodes.push(key);
        if (Reference.isRef(value) && value.isSibling) addNode(value.path, key);else if (isSchema(value) && 'deps' in value) value.deps.forEach(path => addNode(path, key));
      }

      return toposort_1.array(nodes, edges).reverse();
    }

    function findIndex(arr, err) {
      let idx = Infinity;
      arr.some((key, ii) => {
        var _err$path;

        if (((_err$path = err.path) == null ? void 0 : _err$path.indexOf(key)) !== -1) {
          idx = ii;
          return true;
        }
      });
      return idx;
    }

    function sortByKeyOrder(keys) {
      return (a, b) => {
        return findIndex(keys, a) - findIndex(keys, b);
      };
    }

    function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

    let isObject$1 = obj => Object.prototype.toString.call(obj) === '[object Object]';

    function unknown(ctx, value) {
      let known = Object.keys(ctx.fields);
      return Object.keys(value).filter(key => known.indexOf(key) === -1);
    }

    const defaultSort = sortByKeyOrder([]);
    class ObjectSchema extends BaseSchema {
      constructor(spec) {
        super({
          type: 'object'
        });
        this.fields = Object.create(null);
        this._sortErrors = defaultSort;
        this._nodes = [];
        this._excludedEdges = [];
        this.withMutation(() => {
          this.transform(function coerce(value) {
            if (typeof value === 'string') {
              try {
                value = JSON.parse(value);
              } catch (err) {
                value = null;
              }
            }

            if (this.isType(value)) return value;
            return null;
          });

          if (spec) {
            this.shape(spec);
          }
        });
      }

      _typeCheck(value) {
        return isObject$1(value) || typeof value === 'function';
      }

      _cast(_value, options = {}) {
        var _options$stripUnknown;

        let value = super._cast(_value, options); //should ignore nulls here


        if (value === undefined) return this.getDefault();
        if (!this._typeCheck(value)) return value;
        let fields = this.fields;
        let strip = (_options$stripUnknown = options.stripUnknown) != null ? _options$stripUnknown : this.spec.noUnknown;

        let props = this._nodes.concat(Object.keys(value).filter(v => this._nodes.indexOf(v) === -1));

        let intermediateValue = {}; // is filled during the transform below

        let innerOptions = _extends({}, options, {
          parent: intermediateValue,
          __validating: options.__validating || false
        });

        let isChanged = false;

        for (const prop of props) {
          let field = fields[prop];
          let exists = has_1(value, prop);

          if (field) {
            let fieldValue;
            let inputValue = value[prop]; // safe to mutate since this is fired in sequence

            innerOptions.path = (options.path ? `${options.path}.` : '') + prop; // innerOptions.value = value[prop];

            field = field.resolve({
              value: inputValue,
              context: options.context,
              parent: intermediateValue
            });
            let fieldSpec = 'spec' in field ? field.spec : undefined;
            let strict = fieldSpec == null ? void 0 : fieldSpec.strict;

            if (fieldSpec == null ? void 0 : fieldSpec.strip) {
              isChanged = isChanged || prop in value;
              continue;
            }

            fieldValue = !options.__validating || !strict ? // TODO: use _cast, this is double resolving
            field.cast(value[prop], innerOptions) : value[prop];

            if (fieldValue !== undefined) {
              intermediateValue[prop] = fieldValue;
            }
          } else if (exists && !strip) {
            intermediateValue[prop] = value[prop];
          }

          if (intermediateValue[prop] !== value[prop]) {
            isChanged = true;
          }
        }

        return isChanged ? intermediateValue : value;
      }

      _validate(_value, opts = {}, callback) {
        let errors = [];
        let {
          sync,
          from = [],
          originalValue = _value,
          abortEarly = this.spec.abortEarly,
          recursive = this.spec.recursive
        } = opts;
        from = [{
          schema: this,
          value: originalValue
        }, ...from]; // this flag is needed for handling `strict` correctly in the context of
        // validation vs just casting. e.g strict() on a field is only used when validating

        opts.__validating = true;
        opts.originalValue = originalValue;
        opts.from = from;

        super._validate(_value, opts, (err, value) => {
          if (err) {
            if (!ValidationError.isError(err) || abortEarly) {
              return void callback(err, value);
            }

            errors.push(err);
          }

          if (!recursive || !isObject$1(value)) {
            callback(errors[0] || null, value);
            return;
          }

          originalValue = originalValue || value;

          let tests = this._nodes.map(key => (_, cb) => {
            let path = key.indexOf('.') === -1 ? (opts.path ? `${opts.path}.` : '') + key : `${opts.path || ''}["${key}"]`;
            let field = this.fields[key];

            if (field && 'validate' in field) {
              field.validate(value[key], _extends({}, opts, {
                // @ts-ignore
                path,
                from,
                // inner fields are always strict:
                // 1. this isn't strict so the casting will also have cast inner values
                // 2. this is strict in which case the nested values weren't cast either
                strict: true,
                parent: value,
                originalValue: originalValue[key]
              }), cb);
              return;
            }

            cb(null);
          });

          runTests({
            sync,
            tests,
            value,
            errors,
            endEarly: abortEarly,
            sort: this._sortErrors,
            path: opts.path
          }, callback);
        });
      }

      clone(spec) {
        const next = super.clone(spec);
        next.fields = _extends({}, this.fields);
        next._nodes = this._nodes;
        next._excludedEdges = this._excludedEdges;
        next._sortErrors = this._sortErrors;
        return next;
      }

      concat(schema) {
        let next = super.concat(schema);
        let nextFields = next.fields;

        for (let [field, schemaOrRef] of Object.entries(this.fields)) {
          const target = nextFields[field];

          if (target === undefined) {
            nextFields[field] = schemaOrRef;
          } else if (target instanceof BaseSchema && schemaOrRef instanceof BaseSchema) {
            nextFields[field] = schemaOrRef.concat(target);
          }
        }

        return next.withMutation(() => next.shape(nextFields));
      }

      getDefaultFromShape() {
        let dft = {};

        this._nodes.forEach(key => {
          const field = this.fields[key];
          dft[key] = 'default' in field ? field.getDefault() : undefined;
        });

        return dft;
      }

      _getDefault() {
        if ('default' in this.spec) {
          return super._getDefault();
        } // if there is no default set invent one


        if (!this._nodes.length) {
          return undefined;
        }

        return this.getDefaultFromShape();
      }

      shape(additions, excludes = []) {
        let next = this.clone();
        let fields = Object.assign(next.fields, additions);
        next.fields = fields;
        next._sortErrors = sortByKeyOrder(Object.keys(fields));

        if (excludes.length) {
          if (!Array.isArray(excludes[0])) excludes = [excludes];
          let keys = excludes.map(([first, second]) => `${first}-${second}`);
          next._excludedEdges = next._excludedEdges.concat(keys);
        }

        next._nodes = sortFields(fields, next._excludedEdges);
        return next;
      }

      pick(keys) {
        const picked = {};

        for (const key of keys) {
          if (this.fields[key]) picked[key] = this.fields[key];
        }

        return this.clone().withMutation(next => {
          next.fields = {};
          return next.shape(picked);
        });
      }

      omit(keys) {
        const next = this.clone();
        const fields = next.fields;
        next.fields = {};

        for (const key of keys) {
          delete fields[key];
        }

        return next.withMutation(() => next.shape(fields));
      }

      from(from, to, alias) {
        let fromGetter = propertyExpr.getter(from, true);
        return this.transform(obj => {
          if (obj == null) return obj;
          let newObj = obj;

          if (has_1(obj, from)) {
            newObj = _extends({}, obj);
            if (!alias) delete newObj[from];
            newObj[to] = fromGetter(obj);
          }

          return newObj;
        });
      }

      noUnknown(noAllow = true, message = object.noUnknown) {
        if (typeof noAllow === 'string') {
          message = noAllow;
          noAllow = true;
        }

        let next = this.test({
          name: 'noUnknown',
          exclusive: true,
          message: message,

          test(value) {
            if (value == null) return true;
            const unknownKeys = unknown(this.schema, value);
            return !noAllow || unknownKeys.length === 0 || this.createError({
              params: {
                unknown: unknownKeys.join(', ')
              }
            });
          }

        });
        next.spec.noUnknown = noAllow;
        return next;
      }

      unknown(allow = true, message = object.noUnknown) {
        return this.noUnknown(!allow, message);
      }

      transformKeys(fn) {
        return this.transform(obj => obj && mapKeys_1(obj, (_, key) => fn(key)));
      }

      camelCase() {
        return this.transformKeys(camelCase_1);
      }

      snakeCase() {
        return this.transformKeys(snakeCase_1);
      }

      constantCase() {
        return this.transformKeys(key => snakeCase_1(key).toUpperCase());
      }

      describe() {
        let base = super.describe();
        base.fields = mapValues_1(this.fields, value => value.describe());
        return base;
      }

    }
    function create(spec) {
      return new ObjectSchema(spec);
    }
    create.prototype = ObjectSchema.prototype;

    function setLocale(custom) {
      Object.keys(custom).forEach(type => {
        Object.keys(custom[type]).forEach(method => {
          locale[type][method] = custom[type][method];
        });
      });
    }

    setLocale({
        string: {
            min: "Deve conter pelo menos 3 caracteres"
        },
    });

    const schema = create().shape({
        statement: create$1().min(3),
        option1: create$1().required("Este campo é obrigatório"),
        option2: create$1().required("Este campo é obrigatório"),
        option3: create$1().notRequired(),
    });

    function isObject(value) {
      const type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    function getColumnSizeClass(isXs, colWidth, colSize) {
      if (colSize === true || colSize === '') {
        return isXs ? 'col' : `col-${colWidth}`;
      } else if (colSize === 'auto') {
        return isXs ? 'col-auto' : `col-${colWidth}-auto`;
      }

      return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
    }

    function toClassName(value) {
      let result = '';

      if (typeof value === 'string' || typeof value === 'number') {
        result += value;
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          result = value.map(toClassName).filter(Boolean).join(' ');
        } else {
          for (let key in value) {
            if (value[key]) {
              result && (result += ' ');
              result += key;
            }
          }
        }
      }

      return result;
    }

    function classnames(...args) {
      return args.map(toClassName).filter(Boolean).join(' ');
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules\sveltestrap\src\Button.svelte generated by Svelte v3.42.1 */
    const file$d = "node_modules\\sveltestrap\\src\\Button.svelte";

    // (50:0) {:else}
    function create_else_block_1$1(ctx) {
    	let button;
    	let button_aria_label_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);
    	const default_slot_or_fallback = default_slot || fallback_block$1(ctx);

    	let button_levels = [
    		/*$$restProps*/ ctx[9],
    		{ class: /*classes*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ value: /*value*/ ctx[5] },
    		{
    			"aria-label": button_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6]
    		},
    		{ style: /*style*/ ctx[4] }
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			button = element("button");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(button, button_data);
    			add_location(button, file$d, 50, 2, 1044);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			if (button.autofocus) button.focus();
    			/*button_binding*/ ctx[22](button);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[20], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*children, $$scope*/ 131074)) {
    					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
    				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
    				(!current || dirty & /*value*/ 32) && { value: /*value*/ ctx[5] },
    				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && button_aria_label_value !== (button_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6])) && { "aria-label": button_aria_label_value },
    				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			/*button_binding*/ ctx[22](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(50:0) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (33:0) {#if href}
    function create_if_block$5(ctx) {
    	let a;
    	let current_block_type_index;
    	let if_block;
    	let a_aria_label_value;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_1$3, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*children*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let a_levels = [
    		/*$$restProps*/ ctx[9],
    		{ class: /*classes*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ href: /*href*/ ctx[3] },
    		{
    			"aria-label": a_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6]
    		},
    		{ style: /*style*/ ctx[4] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			a = element("a");
    			if_block.c();
    			set_attributes(a, a_data);
    			add_location(a, file$d, 33, 2, 786);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			if_blocks[current_block_type_index].m(a, null);
    			/*a_binding*/ ctx[21](a);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[19], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(a, null);
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
    				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
    				(!current || dirty & /*href*/ 8) && { href: /*href*/ ctx[3] },
    				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && a_aria_label_value !== (a_aria_label_value = /*ariaLabel*/ ctx[8] || /*defaultAriaLabel*/ ctx[6])) && { "aria-label": a_aria_label_value },
    				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if_blocks[current_block_type_index].d();
    			/*a_binding*/ ctx[21](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(33:0) {#if href}",
    		ctx
    	});

    	return block_1;
    }

    // (64:6) {:else}
    function create_else_block_2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	const block_1 = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(64:6) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (62:6) {#if children}
    function create_if_block_2$3(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 2) set_data_dev(t, /*children*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(62:6) {#if children}",
    		ctx
    	});

    	return block_1;
    }

    // (61:10)        
    function fallback_block$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$3, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*children*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: fallback_block$1.name,
    		type: "fallback",
    		source: "(61:10)        ",
    		ctx
    	});

    	return block_1;
    }

    // (46:4) {:else}
    function create_else_block$5(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[18].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[17], null);

    	const block_1 = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 131072)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[17],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[17])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[17], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(46:4) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (44:4) {#if children}
    function create_if_block_1$3(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 2) set_data_dev(t, /*children*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(44:4) {#if children}",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$d(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$5, create_else_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let ariaLabel;
    	let classes;
    	let defaultAriaLabel;

    	const omit_props_names = [
    		"class","active","block","children","close","color","disabled","href","inner","outline","size","style","value"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { active = false } = $$props;
    	let { block = false } = $$props;
    	let { children = undefined } = $$props;
    	let { close = false } = $$props;
    	let { color = 'secondary' } = $$props;
    	let { disabled = false } = $$props;
    	let { href = '' } = $$props;
    	let { inner = undefined } = $$props;
    	let { outline = false } = $$props;
    	let { size = null } = $$props;
    	let { style = '' } = $$props;
    	let { value = '' } = $$props;

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function click_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function a_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(0, inner);
    		});
    	}

    	function button_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(0, inner);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(23, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(10, className = $$new_props.class);
    		if ('active' in $$new_props) $$invalidate(11, active = $$new_props.active);
    		if ('block' in $$new_props) $$invalidate(12, block = $$new_props.block);
    		if ('children' in $$new_props) $$invalidate(1, children = $$new_props.children);
    		if ('close' in $$new_props) $$invalidate(13, close = $$new_props.close);
    		if ('color' in $$new_props) $$invalidate(14, color = $$new_props.color);
    		if ('disabled' in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('href' in $$new_props) $$invalidate(3, href = $$new_props.href);
    		if ('inner' in $$new_props) $$invalidate(0, inner = $$new_props.inner);
    		if ('outline' in $$new_props) $$invalidate(15, outline = $$new_props.outline);
    		if ('size' in $$new_props) $$invalidate(16, size = $$new_props.size);
    		if ('style' in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ('value' in $$new_props) $$invalidate(5, value = $$new_props.value);
    		if ('$$scope' in $$new_props) $$invalidate(17, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		active,
    		block,
    		children,
    		close,
    		color,
    		disabled,
    		href,
    		inner,
    		outline,
    		size,
    		style,
    		value,
    		defaultAriaLabel,
    		classes,
    		ariaLabel
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(23, $$props = assign(assign({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(10, className = $$new_props.className);
    		if ('active' in $$props) $$invalidate(11, active = $$new_props.active);
    		if ('block' in $$props) $$invalidate(12, block = $$new_props.block);
    		if ('children' in $$props) $$invalidate(1, children = $$new_props.children);
    		if ('close' in $$props) $$invalidate(13, close = $$new_props.close);
    		if ('color' in $$props) $$invalidate(14, color = $$new_props.color);
    		if ('disabled' in $$props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ('href' in $$props) $$invalidate(3, href = $$new_props.href);
    		if ('inner' in $$props) $$invalidate(0, inner = $$new_props.inner);
    		if ('outline' in $$props) $$invalidate(15, outline = $$new_props.outline);
    		if ('size' in $$props) $$invalidate(16, size = $$new_props.size);
    		if ('style' in $$props) $$invalidate(4, style = $$new_props.style);
    		if ('value' in $$props) $$invalidate(5, value = $$new_props.value);
    		if ('defaultAriaLabel' in $$props) $$invalidate(6, defaultAriaLabel = $$new_props.defaultAriaLabel);
    		if ('classes' in $$props) $$invalidate(7, classes = $$new_props.classes);
    		if ('ariaLabel' in $$props) $$invalidate(8, ariaLabel = $$new_props.ariaLabel);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(8, ariaLabel = $$props['aria-label']);

    		if ($$self.$$.dirty & /*className, close, outline, color, size, block, active*/ 130048) {
    			$$invalidate(7, classes = classnames(className, close ? 'btn-close' : 'btn', close || `btn${outline ? '-outline' : ''}-${color}`, size ? `btn-${size}` : false, block ? 'd-block w-100' : false, { active }));
    		}

    		if ($$self.$$.dirty & /*close*/ 8192) {
    			$$invalidate(6, defaultAriaLabel = close ? 'Close' : null);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		inner,
    		children,
    		disabled,
    		href,
    		style,
    		value,
    		defaultAriaLabel,
    		classes,
    		ariaLabel,
    		$$restProps,
    		className,
    		active,
    		block,
    		close,
    		color,
    		outline,
    		size,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1,
    		a_binding,
    		button_binding
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			class: 10,
    			active: 11,
    			block: 12,
    			children: 1,
    			close: 13,
    			color: 14,
    			disabled: 2,
    			href: 3,
    			inner: 0,
    			outline: 15,
    			size: 16,
    			style: 4,
    			value: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get children() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set children(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inner() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inner(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outline() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outline(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Form.svelte generated by Svelte v3.42.1 */
    const file$c = "node_modules\\sveltestrap\\src\\Form.svelte";

    function create_fragment$c(ctx) {
    	let form;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let form_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let form_data = {};

    	for (let i = 0; i < form_levels.length; i += 1) {
    		form_data = assign(form_data, form_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			form = element("form");
    			if (default_slot) default_slot.c();
    			set_attributes(form, form_data);
    			add_location(form, file$c, 14, 0, 277);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);

    			if (default_slot) {
    				default_slot.m(form, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", /*submit_handler*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(form, form_data = get_spread_update(form_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","inline","validated"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Form', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { inline = false } = $$props;
    	let { validated = false } = $$props;

    	function submit_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('inline' in $$new_props) $$invalidate(3, inline = $$new_props.inline);
    		if ('validated' in $$new_props) $$invalidate(4, validated = $$new_props.validated);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		inline,
    		validated,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('inline' in $$props) $$invalidate(3, inline = $$new_props.inline);
    		if ('validated' in $$props) $$invalidate(4, validated = $$new_props.validated);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, inline, validated*/ 28) {
    			$$invalidate(0, classes = classnames(className, {
    				'form-inline': inline,
    				'was-validated': validated
    			}));
    		}
    	};

    	return [
    		classes,
    		$$restProps,
    		className,
    		inline,
    		validated,
    		$$scope,
    		slots,
    		submit_handler
    	];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { class: 2, inline: 3, validated: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get class() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get validated() {
    		throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set validated(value) {
    		throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\FormCheck.svelte generated by Svelte v3.42.1 */
    const file$b = "node_modules\\sveltestrap\\src\\FormCheck.svelte";
    const get_label_slot_changes = dirty => ({});
    const get_label_slot_context = ctx => ({});

    // (66:2) {:else}
    function create_else_block$4(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[11],
    		{ class: /*inputClasses*/ ctx[9] },
    		{ id: /*idFor*/ ctx[8] },
    		{ type: "checkbox" },
    		{ disabled: /*disabled*/ ctx[3] },
    		{ name: /*name*/ ctx[5] },
    		{ __value: /*value*/ ctx[7] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$b, 66, 4, 1386);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			input.checked = /*checked*/ ctx[0];
    			/*input_binding_2*/ ctx[38](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_2*/ ctx[28], false, false, false),
    					listen_dev(input, "change", /*change_handler_2*/ ctx[29], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_2*/ ctx[30], false, false, false),
    					listen_dev(input, "input", /*input_handler_2*/ ctx[31], false, false, false),
    					listen_dev(input, "change", /*input_change_handler_2*/ ctx[37])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11],
    				dirty[0] & /*inputClasses*/ 512 && { class: /*inputClasses*/ ctx[9] },
    				dirty[0] & /*idFor*/ 256 && { id: /*idFor*/ ctx[8] },
    				{ type: "checkbox" },
    				dirty[0] & /*disabled*/ 8 && { disabled: /*disabled*/ ctx[3] },
    				dirty[0] & /*name*/ 32 && { name: /*name*/ ctx[5] },
    				dirty[0] & /*value*/ 128 && { __value: /*value*/ ctx[7] }
    			]));

    			if (dirty[0] & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_2*/ ctx[38](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(66:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (50:30) 
    function create_if_block_2$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[11],
    		{ class: /*inputClasses*/ ctx[9] },
    		{ id: /*idFor*/ ctx[8] },
    		{ type: "checkbox" },
    		{ disabled: /*disabled*/ ctx[3] },
    		{ name: /*name*/ ctx[5] },
    		{ __value: /*value*/ ctx[7] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$b, 50, 4, 1122);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			input.checked = /*checked*/ ctx[0];
    			/*input_binding_1*/ ctx[36](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_1*/ ctx[24], false, false, false),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[25], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_1*/ ctx[26], false, false, false),
    					listen_dev(input, "input", /*input_handler_1*/ ctx[27], false, false, false),
    					listen_dev(input, "change", /*input_change_handler_1*/ ctx[35])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11],
    				dirty[0] & /*inputClasses*/ 512 && { class: /*inputClasses*/ ctx[9] },
    				dirty[0] & /*idFor*/ 256 && { id: /*idFor*/ ctx[8] },
    				{ type: "checkbox" },
    				dirty[0] & /*disabled*/ 8 && { disabled: /*disabled*/ ctx[3] },
    				dirty[0] & /*name*/ 32 && { name: /*name*/ ctx[5] },
    				dirty[0] & /*value*/ 128 && { __value: /*value*/ ctx[7] }
    			]));

    			if (dirty[0] & /*checked*/ 1) {
    				input.checked = /*checked*/ ctx[0];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_1*/ ctx[36](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(50:30) ",
    		ctx
    	});

    	return block;
    }

    // (34:2) {#if type === 'radio'}
    function create_if_block_1$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[11],
    		{ class: /*inputClasses*/ ctx[9] },
    		{ id: /*idFor*/ ctx[8] },
    		{ type: "radio" },
    		{ disabled: /*disabled*/ ctx[3] },
    		{ name: /*name*/ ctx[5] },
    		{ __value: /*value*/ ctx[7] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			/*$$binding_groups*/ ctx[33][0].push(input);
    			add_location(input, file$b, 34, 4, 842);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			input.checked = input.__value === /*group*/ ctx[1];
    			/*input_binding*/ ctx[34](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler*/ ctx[20], false, false, false),
    					listen_dev(input, "change", /*change_handler*/ ctx[21], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[22], false, false, false),
    					listen_dev(input, "input", /*input_handler*/ ctx[23], false, false, false),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[32])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2048 && /*$$restProps*/ ctx[11],
    				dirty[0] & /*inputClasses*/ 512 && { class: /*inputClasses*/ ctx[9] },
    				dirty[0] & /*idFor*/ 256 && { id: /*idFor*/ ctx[8] },
    				{ type: "radio" },
    				dirty[0] & /*disabled*/ 8 && { disabled: /*disabled*/ ctx[3] },
    				dirty[0] & /*name*/ 32 && { name: /*name*/ ctx[5] },
    				dirty[0] & /*value*/ 128 && { __value: /*value*/ ctx[7] }
    			]));

    			if (dirty[0] & /*group*/ 2) {
    				input.checked = input.__value === /*group*/ ctx[1];
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*$$binding_groups*/ ctx[33][0].splice(/*$$binding_groups*/ ctx[33][0].indexOf(input), 1);
    			/*input_binding*/ ctx[34](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(34:2) {#if type === 'radio'}",
    		ctx
    	});

    	return block;
    }

    // (83:2) {#if label}
    function create_if_block$4(ctx) {
    	let label_1;
    	let current;
    	const label_slot_template = /*#slots*/ ctx[19].label;
    	const label_slot = create_slot(label_slot_template, ctx, /*$$scope*/ ctx[18], get_label_slot_context);
    	const label_slot_or_fallback = label_slot || fallback_block(ctx);

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			if (label_slot_or_fallback) label_slot_or_fallback.c();
    			attr_dev(label_1, "class", "form-check-label");
    			attr_dev(label_1, "for", /*idFor*/ ctx[8]);
    			add_location(label_1, file$b, 83, 4, 1662);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);

    			if (label_slot_or_fallback) {
    				label_slot_or_fallback.m(label_1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (label_slot) {
    				if (label_slot.p && (!current || dirty[0] & /*$$scope*/ 262144)) {
    					update_slot_base(
    						label_slot,
    						label_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(label_slot_template, /*$$scope*/ ctx[18], dirty, get_label_slot_changes),
    						get_label_slot_context
    					);
    				}
    			} else {
    				if (label_slot_or_fallback && label_slot_or_fallback.p && (!current || dirty[0] & /*label*/ 16)) {
    					label_slot_or_fallback.p(ctx, !current ? [-1, -1] : dirty);
    				}
    			}

    			if (!current || dirty[0] & /*idFor*/ 256) {
    				attr_dev(label_1, "for", /*idFor*/ ctx[8]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    			if (label_slot_or_fallback) label_slot_or_fallback.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(83:2) {#if label}",
    		ctx
    	});

    	return block;
    }

    // (85:25) {label}
    function fallback_block(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*label*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*label*/ 16) set_data_dev(t, /*label*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(85:25) {label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div;
    	let t;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*type*/ ctx[6] === 'radio') return create_if_block_1$2;
    		if (/*type*/ ctx[6] === 'switch') return create_if_block_2$2;
    		return create_else_block$4;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*label*/ ctx[4] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div, "class", /*classes*/ ctx[10]);
    			add_location(div, file$b, 32, 0, 791);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block0.m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div, t);
    				}
    			}

    			if (/*label*/ ctx[4]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*label*/ 16) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$4(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty[0] & /*classes*/ 1024) {
    				attr_dev(div, "class", /*classes*/ ctx[10]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let classes;
    	let inputClasses;
    	let idFor;

    	const omit_props_names = [
    		"class","checked","disabled","group","id","inline","inner","invalid","label","name","size","type","valid","value"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormCheck', slots, ['label']);
    	let { class: className = '' } = $$props;
    	let { checked = false } = $$props;
    	let { disabled = false } = $$props;
    	let { group = undefined } = $$props;
    	let { id = undefined } = $$props;
    	let { inline = false } = $$props;
    	let { inner = undefined } = $$props;
    	let { invalid = false } = $$props;
    	let { label = '' } = $$props;
    	let { name = '' } = $$props;
    	let { size = '' } = $$props;
    	let { type = 'checkbox' } = $$props;
    	let { valid = false } = $$props;
    	let { value = undefined } = $$props;
    	const $$binding_groups = [[]];

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_change_handler() {
    		group = this.__value;
    		$$invalidate(1, group);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(2, inner);
    		});
    	}

    	function input_change_handler_1() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	function input_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(2, inner);
    		});
    	}

    	function input_change_handler_2() {
    		checked = this.checked;
    		$$invalidate(0, checked);
    	}

    	function input_binding_2($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(2, inner);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(12, className = $$new_props.class);
    		if ('checked' in $$new_props) $$invalidate(0, checked = $$new_props.checked);
    		if ('disabled' in $$new_props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('group' in $$new_props) $$invalidate(1, group = $$new_props.group);
    		if ('id' in $$new_props) $$invalidate(13, id = $$new_props.id);
    		if ('inline' in $$new_props) $$invalidate(14, inline = $$new_props.inline);
    		if ('inner' in $$new_props) $$invalidate(2, inner = $$new_props.inner);
    		if ('invalid' in $$new_props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('label' in $$new_props) $$invalidate(4, label = $$new_props.label);
    		if ('name' in $$new_props) $$invalidate(5, name = $$new_props.name);
    		if ('size' in $$new_props) $$invalidate(16, size = $$new_props.size);
    		if ('type' in $$new_props) $$invalidate(6, type = $$new_props.type);
    		if ('valid' in $$new_props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$new_props) $$invalidate(7, value = $$new_props.value);
    		if ('$$scope' in $$new_props) $$invalidate(18, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		checked,
    		disabled,
    		group,
    		id,
    		inline,
    		inner,
    		invalid,
    		label,
    		name,
    		size,
    		type,
    		valid,
    		value,
    		idFor,
    		inputClasses,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(12, className = $$new_props.className);
    		if ('checked' in $$props) $$invalidate(0, checked = $$new_props.checked);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$new_props.disabled);
    		if ('group' in $$props) $$invalidate(1, group = $$new_props.group);
    		if ('id' in $$props) $$invalidate(13, id = $$new_props.id);
    		if ('inline' in $$props) $$invalidate(14, inline = $$new_props.inline);
    		if ('inner' in $$props) $$invalidate(2, inner = $$new_props.inner);
    		if ('invalid' in $$props) $$invalidate(15, invalid = $$new_props.invalid);
    		if ('label' in $$props) $$invalidate(4, label = $$new_props.label);
    		if ('name' in $$props) $$invalidate(5, name = $$new_props.name);
    		if ('size' in $$props) $$invalidate(16, size = $$new_props.size);
    		if ('type' in $$props) $$invalidate(6, type = $$new_props.type);
    		if ('valid' in $$props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$props) $$invalidate(7, value = $$new_props.value);
    		if ('idFor' in $$props) $$invalidate(8, idFor = $$new_props.idFor);
    		if ('inputClasses' in $$props) $$invalidate(9, inputClasses = $$new_props.inputClasses);
    		if ('classes' in $$props) $$invalidate(10, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*className, type, inline, size*/ 86080) {
    			$$invalidate(10, classes = classnames(className, 'form-check', {
    				'form-switch': type === 'switch',
    				'form-check-inline': inline,
    				[`form-control-${size}`]: size
    			}));
    		}

    		if ($$self.$$.dirty[0] & /*invalid, valid*/ 163840) {
    			$$invalidate(9, inputClasses = classnames('form-check-input', { 'is-invalid': invalid, 'is-valid': valid }));
    		}

    		if ($$self.$$.dirty[0] & /*id, label*/ 8208) {
    			$$invalidate(8, idFor = id || label);
    		}
    	};

    	return [
    		checked,
    		group,
    		inner,
    		disabled,
    		label,
    		name,
    		type,
    		value,
    		idFor,
    		inputClasses,
    		classes,
    		$$restProps,
    		className,
    		id,
    		inline,
    		invalid,
    		size,
    		valid,
    		$$scope,
    		slots,
    		blur_handler,
    		change_handler,
    		focus_handler,
    		input_handler,
    		blur_handler_1,
    		change_handler_1,
    		focus_handler_1,
    		input_handler_1,
    		blur_handler_2,
    		change_handler_2,
    		focus_handler_2,
    		input_handler_2,
    		input_change_handler,
    		$$binding_groups,
    		input_binding,
    		input_change_handler_1,
    		input_binding_1,
    		input_change_handler_2,
    		input_binding_2
    	];
    }

    class FormCheck extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$b,
    			create_fragment$b,
    			safe_not_equal,
    			{
    				class: 12,
    				checked: 0,
    				disabled: 3,
    				group: 1,
    				id: 13,
    				inline: 14,
    				inner: 2,
    				invalid: 15,
    				label: 4,
    				name: 5,
    				size: 16,
    				type: 6,
    				valid: 17,
    				value: 7
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormCheck",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get class() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inner() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inner(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valid() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valid(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<FormCheck>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<FormCheck>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\FormFeedback.svelte generated by Svelte v3.42.1 */
    const file$a = "node_modules\\sveltestrap\\src\\FormFeedback.svelte";

    function create_fragment$a(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$a, 19, 0, 368);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	const omit_props_names = ["class","valid","tooltip"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormFeedback', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { valid = undefined } = $$props;
    	let { tooltip = false } = $$props;
    	let classes;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('valid' in $$new_props) $$invalidate(3, valid = $$new_props.valid);
    		if ('tooltip' in $$new_props) $$invalidate(4, tooltip = $$new_props.tooltip);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		valid,
    		tooltip,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('valid' in $$props) $$invalidate(3, valid = $$new_props.valid);
    		if ('tooltip' in $$props) $$invalidate(4, tooltip = $$new_props.tooltip);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*tooltip, className, valid*/ 28) {
    			{
    				const validMode = tooltip ? 'tooltip' : 'feedback';
    				$$invalidate(0, classes = classnames(className, valid ? `valid-${validMode}` : `invalid-${validMode}`));
    			}
    		}
    	};

    	return [classes, $$restProps, className, valid, tooltip, $$scope, slots];
    }

    class FormFeedback extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { class: 2, valid: 3, tooltip: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormFeedback",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get class() {
    		throw new Error("<FormFeedback>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormFeedback>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valid() {
    		throw new Error("<FormFeedback>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valid(value) {
    		throw new Error("<FormFeedback>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tooltip() {
    		throw new Error("<FormFeedback>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tooltip(value) {
    		throw new Error("<FormFeedback>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\FormGroup.svelte generated by Svelte v3.42.1 */
    const file$9 = "node_modules\\sveltestrap\\src\\FormGroup.svelte";

    // (24:0) {:else}
    function create_else_block$3(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);
    	let div_levels = [/*$$restProps*/ ctx[2], { class: /*classes*/ ctx[1] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$9, 24, 2, 528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(24:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:0) {#if tag === 'fieldset'}
    function create_if_block$3(ctx) {
    	let fieldset;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);
    	let fieldset_levels = [/*$$restProps*/ ctx[2], { class: /*classes*/ ctx[1] }];
    	let fieldset_data = {};

    	for (let i = 0; i < fieldset_levels.length; i += 1) {
    		fieldset_data = assign(fieldset_data, fieldset_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			fieldset = element("fieldset");
    			if (default_slot) default_slot.c();
    			set_attributes(fieldset, fieldset_data);
    			add_location(fieldset, file$9, 20, 2, 447);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, fieldset, anchor);

    			if (default_slot) {
    				default_slot.m(fieldset, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(fieldset, fieldset_data = get_spread_update(fieldset_levels, [
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(fieldset);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(20:0) {#if tag === 'fieldset'}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*tag*/ ctx[0] === 'fieldset') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","check","disabled","inline","row","tag"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormGroup', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { check = false } = $$props;
    	let { disabled = false } = $$props;
    	let { inline = false } = $$props;
    	let { row = false } = $$props;
    	let { tag = null } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('check' in $$new_props) $$invalidate(4, check = $$new_props.check);
    		if ('disabled' in $$new_props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('inline' in $$new_props) $$invalidate(6, inline = $$new_props.inline);
    		if ('row' in $$new_props) $$invalidate(7, row = $$new_props.row);
    		if ('tag' in $$new_props) $$invalidate(0, tag = $$new_props.tag);
    		if ('$$scope' in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		check,
    		disabled,
    		inline,
    		row,
    		tag,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('check' in $$props) $$invalidate(4, check = $$new_props.check);
    		if ('disabled' in $$props) $$invalidate(5, disabled = $$new_props.disabled);
    		if ('inline' in $$props) $$invalidate(6, inline = $$new_props.inline);
    		if ('row' in $$props) $$invalidate(7, row = $$new_props.row);
    		if ('tag' in $$props) $$invalidate(0, tag = $$new_props.tag);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, row, check, inline, disabled*/ 248) {
    			$$invalidate(1, classes = classnames(className, 'mb-3', {
    				row,
    				'form-check': check,
    				'form-check-inline': check && inline,
    				disabled: check && disabled
    			}));
    		}
    	};

    	return [
    		tag,
    		classes,
    		$$restProps,
    		className,
    		check,
    		disabled,
    		inline,
    		row,
    		$$scope,
    		slots
    	];
    }

    class FormGroup extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			class: 3,
    			check: 4,
    			disabled: 5,
    			inline: 6,
    			row: 7,
    			tag: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormGroup",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get class() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get check() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set check(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get row() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set row(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tag() {
    		throw new Error("<FormGroup>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tag(value) {
    		throw new Error("<FormGroup>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\FormText.svelte generated by Svelte v3.42.1 */
    const file$8 = "node_modules\\sveltestrap\\src\\FormText.svelte";

    function create_fragment$8(ctx) {
    	let small;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);
    	let small_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let small_data = {};

    	for (let i = 0; i < small_levels.length; i += 1) {
    		small_data = assign(small_data, small_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			small = element("small");
    			if (default_slot) default_slot.c();
    			set_attributes(small, small_data);
    			add_location(small, file$8, 15, 0, 290);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, small, anchor);

    			if (default_slot) {
    				default_slot.m(small, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(small, small_data = get_spread_update(small_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(small);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","inline","color"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormText', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { inline = false } = $$props;
    	let { color = 'muted' } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ('inline' in $$new_props) $$invalidate(3, inline = $$new_props.inline);
    		if ('color' in $$new_props) $$invalidate(4, color = $$new_props.color);
    		if ('$$scope' in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		inline,
    		color,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(2, className = $$new_props.className);
    		if ('inline' in $$props) $$invalidate(3, inline = $$new_props.inline);
    		if ('color' in $$props) $$invalidate(4, color = $$new_props.color);
    		if ('classes' in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, inline, color*/ 28) {
    			$$invalidate(0, classes = classnames(className, !inline ? 'form-text' : false, color ? `text-${color}` : false));
    		}
    	};

    	return [classes, $$restProps, className, inline, color, $$scope, slots];
    }

    class FormText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { class: 2, inline: 3, color: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormText",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get class() {
    		throw new Error("<FormText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<FormText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<FormText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<FormText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<FormText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<FormText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Input.svelte generated by Svelte v3.42.1 */
    const file$7 = "node_modules\\sveltestrap\\src\\Input.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[210] = list[i];
    	return child_ctx;
    }

    // (490:40) 
    function create_if_block_22(ctx) {
    	let select;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[24].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[209], null);

    	let select_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ readonly: /*readonly*/ ctx[15] }
    	];

    	let select_data = {};

    	for (let i = 0; i < select_levels.length; i += 1) {
    		select_data = assign(select_data, select_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			select = element("select");
    			if (default_slot) default_slot.c();
    			set_attributes(select, select_data);
    			if (/*value*/ ctx[6] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[207].call(select));
    			add_location(select, file$7, 490, 2, 9197);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			if (default_slot) {
    				default_slot.m(select, null);
    			}

    			(select_data.multiple ? select_options : select_option)(select, select_data.value);
    			if (select.autofocus) select.focus();
    			select_option(select, /*value*/ ctx[6]);
    			/*select_binding*/ ctx[208](select);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "blur", /*blur_handler_20*/ ctx[156], false, false, false),
    					listen_dev(select, "change", /*change_handler_19*/ ctx[157], false, false, false),
    					listen_dev(select, "focus", /*focus_handler_20*/ ctx[158], false, false, false),
    					listen_dev(select, "input", /*input_handler_19*/ ctx[159], false, false, false),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[207])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[6] & /*$$scope*/ 8388608)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[209],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[209])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[209], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(select, select_data = get_spread_update(select_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				(!current || dirty[0] & /*classes*/ 262144) && { class: /*classes*/ ctx[18] },
    				(!current || dirty[0] & /*name*/ 8192) && { name: /*name*/ ctx[13] },
    				(!current || dirty[0] & /*disabled*/ 256) && { disabled: /*disabled*/ ctx[8] },
    				(!current || dirty[0] & /*readonly*/ 32768) && { readonly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*$$restProps, classes, name, disabled, readonly*/ 2400512) (select_data.multiple ? select_options : select_option)(select, select_data.value);
    			

    			if (dirty[0] & /*value*/ 64) {
    				select_option(select, /*value*/ ctx[6]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			if (default_slot) default_slot.d(detaching);
    			/*select_binding*/ ctx[208](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_22.name,
    		type: "if",
    		source: "(490:40) ",
    		ctx
    	});

    	return block;
    }

    // (472:29) 
    function create_if_block_21(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	let textarea_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let textarea_data = {};

    	for (let i = 0; i < textarea_levels.length; i += 1) {
    		textarea_data = assign(textarea_data, textarea_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			set_attributes(textarea, textarea_data);
    			add_location(textarea, file$7, 472, 2, 8906);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);
    			if (textarea.autofocus) textarea.focus();
    			set_input_value(textarea, /*value*/ ctx[6]);
    			/*textarea_binding*/ ctx[206](textarea);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea, "blur", /*blur_handler_19*/ ctx[149], false, false, false),
    					listen_dev(textarea, "change", /*change_handler_18*/ ctx[150], false, false, false),
    					listen_dev(textarea, "focus", /*focus_handler_19*/ ctx[151], false, false, false),
    					listen_dev(textarea, "input", /*input_handler_18*/ ctx[152], false, false, false),
    					listen_dev(textarea, "keydown", /*keydown_handler_19*/ ctx[153], false, false, false),
    					listen_dev(textarea, "keypress", /*keypress_handler_19*/ ctx[154], false, false, false),
    					listen_dev(textarea, "keyup", /*keyup_handler_19*/ ctx[155], false, false, false),
    					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[205])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(textarea, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			/*textarea_binding*/ ctx[206](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_21.name,
    		type: "if",
    		source: "(472:29) ",
    		ctx
    	});

    	return block;
    }

    // (93:0) {#if tag === 'input'}
    function create_if_block_2$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	const if_block_creators = [
    		create_if_block_3,
    		create_if_block_4,
    		create_if_block_5,
    		create_if_block_6,
    		create_if_block_7,
    		create_if_block_8,
    		create_if_block_9,
    		create_if_block_10,
    		create_if_block_11,
    		create_if_block_12,
    		create_if_block_13,
    		create_if_block_14,
    		create_if_block_15,
    		create_if_block_16,
    		create_if_block_17,
    		create_if_block_18,
    		create_if_block_19,
    		create_if_block_20,
    		create_else_block_1
    	];

    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*type*/ ctx[16] === 'text') return 0;
    		if (/*type*/ ctx[16] === 'password') return 1;
    		if (/*type*/ ctx[16] === 'color') return 2;
    		if (/*type*/ ctx[16] === 'email') return 3;
    		if (/*type*/ ctx[16] === 'file') return 4;
    		if (/*type*/ ctx[16] === 'checkbox' || /*type*/ ctx[16] === 'radio' || /*type*/ ctx[16] === 'switch') return 5;
    		if (/*type*/ ctx[16] === 'url') return 6;
    		if (/*type*/ ctx[16] === 'number') return 7;
    		if (/*type*/ ctx[16] === 'date') return 8;
    		if (/*type*/ ctx[16] === 'time') return 9;
    		if (/*type*/ ctx[16] === 'datetime') return 10;
    		if (/*type*/ ctx[16] === 'datetime-local') return 11;
    		if (/*type*/ ctx[16] === 'month') return 12;
    		if (/*type*/ ctx[16] === 'color') return 13;
    		if (/*type*/ ctx[16] === 'range') return 14;
    		if (/*type*/ ctx[16] === 'search') return 15;
    		if (/*type*/ ctx[16] === 'tel') return 16;
    		if (/*type*/ ctx[16] === 'week') return 17;
    		return 18;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(93:0) {#if tag === 'input'}",
    		ctx
    	});

    	return block;
    }

    // (453:2) {:else}
    function create_else_block_1(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: /*type*/ ctx[16] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ value: /*value*/ ctx[6] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 453, 4, 8575);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			input.value = input_data.value;
    			if (input.autofocus) input.focus();

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_18*/ ctx[144], false, false, false),
    					listen_dev(input, "change", /*handleInput*/ ctx[20], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_18*/ ctx[145], false, false, false),
    					listen_dev(input, "input", /*handleInput*/ ctx[20], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_18*/ ctx[146], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_18*/ ctx[147], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_18*/ ctx[148], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*type*/ 65536 && { type: /*type*/ ctx[16] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6] && { value: /*value*/ ctx[6] }
    			]));

    			if ('value' in input_data) {
    				input.value = input_data.value;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(453:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (434:28) 
    function create_if_block_20(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "week" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 434, 4, 8266);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_16*/ ctx[204](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_17*/ ctx[137], false, false, false),
    					listen_dev(input, "change", /*change_handler_17*/ ctx[138], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_17*/ ctx[139], false, false, false),
    					listen_dev(input, "input", /*input_handler_17*/ ctx[140], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_17*/ ctx[141], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_17*/ ctx[142], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_17*/ ctx[143], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_14*/ ctx[203])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "week" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_16*/ ctx[204](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_20.name,
    		type: "if",
    		source: "(434:28) ",
    		ctx
    	});

    	return block;
    }

    // (414:27) 
    function create_if_block_19(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "tel" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 414, 4, 7926);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_15*/ ctx[202](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_16*/ ctx[130], false, false, false),
    					listen_dev(input, "change", /*change_handler_16*/ ctx[131], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_16*/ ctx[132], false, false, false),
    					listen_dev(input, "input", /*input_handler_16*/ ctx[133], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_16*/ ctx[134], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_16*/ ctx[135], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_16*/ ctx[136], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_13*/ ctx[201])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "tel" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_15*/ ctx[202](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_19.name,
    		type: "if",
    		source: "(414:27) ",
    		ctx
    	});

    	return block;
    }

    // (394:30) 
    function create_if_block_18(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "search" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 394, 4, 7584);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_14*/ ctx[200](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_15*/ ctx[123], false, false, false),
    					listen_dev(input, "change", /*change_handler_15*/ ctx[124], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_15*/ ctx[125], false, false, false),
    					listen_dev(input, "input", /*input_handler_15*/ ctx[126], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_15*/ ctx[127], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_15*/ ctx[128], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_15*/ ctx[129], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_12*/ ctx[199])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "search" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_14*/ ctx[200](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_18.name,
    		type: "if",
    		source: "(394:30) ",
    		ctx
    	});

    	return block;
    }

    // (375:29) 
    function create_if_block_17(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: "range" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 375, 4, 7253);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_13*/ ctx[198](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_14*/ ctx[116], false, false, false),
    					listen_dev(input, "change", /*change_handler_14*/ ctx[117], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_14*/ ctx[118], false, false, false),
    					listen_dev(input, "input", /*input_handler_14*/ ctx[119], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_14*/ ctx[120], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_14*/ ctx[121], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_14*/ ctx[122], false, false, false),
    					listen_dev(input, "change", /*input_change_input_handler*/ ctx[197]),
    					listen_dev(input, "input", /*input_change_input_handler*/ ctx[197])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				{ type: "range" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_13*/ ctx[198](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_17.name,
    		type: "if",
    		source: "(375:29) ",
    		ctx
    	});

    	return block;
    }

    // (356:29) 
    function create_if_block_16(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: "color" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 356, 4, 6923);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_12*/ ctx[196](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_13*/ ctx[109], false, false, false),
    					listen_dev(input, "change", /*change_handler_13*/ ctx[110], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_13*/ ctx[111], false, false, false),
    					listen_dev(input, "input", /*input_handler_13*/ ctx[112], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_13*/ ctx[113], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_13*/ ctx[114], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_13*/ ctx[115], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_11*/ ctx[195])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				{ type: "color" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_12*/ ctx[196](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_16.name,
    		type: "if",
    		source: "(356:29) ",
    		ctx
    	});

    	return block;
    }

    // (337:29) 
    function create_if_block_15(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "month" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 337, 4, 6593);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_11*/ ctx[194](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_12*/ ctx[102], false, false, false),
    					listen_dev(input, "change", /*change_handler_12*/ ctx[103], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_12*/ ctx[104], false, false, false),
    					listen_dev(input, "input", /*input_handler_12*/ ctx[105], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_12*/ ctx[106], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_12*/ ctx[107], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_12*/ ctx[108], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_10*/ ctx[193])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "month" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_11*/ ctx[194](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_15.name,
    		type: "if",
    		source: "(337:29) ",
    		ctx
    	});

    	return block;
    }

    // (318:38) 
    function create_if_block_14(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "datetime-local" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 318, 4, 6254);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_10*/ ctx[192](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_11*/ ctx[95], false, false, false),
    					listen_dev(input, "change", /*change_handler_11*/ ctx[96], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_11*/ ctx[97], false, false, false),
    					listen_dev(input, "input", /*input_handler_11*/ ctx[98], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_11*/ ctx[99], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_11*/ ctx[100], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_11*/ ctx[101], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_9*/ ctx[191])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "datetime-local" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_10*/ ctx[192](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_14.name,
    		type: "if",
    		source: "(318:38) ",
    		ctx
    	});

    	return block;
    }

    // (299:32) 
    function create_if_block_13(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ type: "datetime" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ class: /*classes*/ ctx[18] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 299, 4, 5912);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_9*/ ctx[190](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_10*/ ctx[88], false, false, false),
    					listen_dev(input, "change", /*change_handler_10*/ ctx[89], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_10*/ ctx[90], false, false, false),
    					listen_dev(input, "input", /*input_handler_10*/ ctx[91], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_10*/ ctx[92], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_10*/ ctx[93], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_10*/ ctx[94], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_8*/ ctx[189])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				{ type: "datetime" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_9*/ ctx[190](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_13.name,
    		type: "if",
    		source: "(299:32) ",
    		ctx
    	});

    	return block;
    }

    // (280:28) 
    function create_if_block_12(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "time" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 280, 4, 5580);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_8*/ ctx[188](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_9*/ ctx[81], false, false, false),
    					listen_dev(input, "change", /*change_handler_9*/ ctx[82], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_9*/ ctx[83], false, false, false),
    					listen_dev(input, "input", /*input_handler_9*/ ctx[84], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_9*/ ctx[85], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_9*/ ctx[86], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_9*/ ctx[87], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_7*/ ctx[187])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "time" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_8*/ ctx[188](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_12.name,
    		type: "if",
    		source: "(280:28) ",
    		ctx
    	});

    	return block;
    }

    // (261:28) 
    function create_if_block_11(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "date" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 261, 4, 5252);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_7*/ ctx[186](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_8*/ ctx[74], false, false, false),
    					listen_dev(input, "change", /*change_handler_8*/ ctx[75], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_8*/ ctx[76], false, false, false),
    					listen_dev(input, "input", /*input_handler_8*/ ctx[77], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_8*/ ctx[78], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_8*/ ctx[79], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_8*/ ctx[80], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_6*/ ctx[185])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "date" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_7*/ ctx[186](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_11.name,
    		type: "if",
    		source: "(261:28) ",
    		ctx
    	});

    	return block;
    }

    // (242:30) 
    function create_if_block_10(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "number" },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ name: /*name*/ ctx[13] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ placeholder: /*placeholder*/ ctx[14] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 242, 4, 4922);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_6*/ ctx[184](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_7*/ ctx[67], false, false, false),
    					listen_dev(input, "change", /*change_handler_7*/ ctx[68], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_7*/ ctx[69], false, false, false),
    					listen_dev(input, "input", /*input_handler_7*/ ctx[70], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_7*/ ctx[71], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_7*/ ctx[72], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_7*/ ctx[73], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_5*/ ctx[183])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "number" },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] }
    			]));

    			if (dirty[0] & /*value*/ 64 && to_number(input.value) !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_6*/ ctx[184](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_10.name,
    		type: "if",
    		source: "(242:30) ",
    		ctx
    	});

    	return block;
    }

    // (222:27) 
    function create_if_block_9(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "url" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 222, 4, 4580);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_5*/ ctx[182](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_6*/ ctx[60], false, false, false),
    					listen_dev(input, "change", /*change_handler_6*/ ctx[61], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_6*/ ctx[62], false, false, false),
    					listen_dev(input, "input", /*input_handler_6*/ ctx[63], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_6*/ ctx[64], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_6*/ ctx[65], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_6*/ ctx[66], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_4*/ ctx[181])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "url" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_5*/ ctx[182](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_9.name,
    		type: "if",
    		source: "(222:27) ",
    		ctx
    	});

    	return block;
    }

    // (197:73) 
    function create_if_block_8(ctx) {
    	let formcheck;
    	let updating_checked;
    	let updating_group;
    	let updating_value;
    	let current;

    	const formcheck_spread_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*className*/ ctx[7] },
    		{ size: /*bsSize*/ ctx[0] },
    		{ type: /*type*/ ctx[16] },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ invalid: /*invalid*/ ctx[10] },
    		{ label: /*label*/ ctx[11] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readonly: /*readonly*/ ctx[15] },
    		{ valid: /*valid*/ ctx[17] }
    	];

    	function formcheck_checked_binding(value) {
    		/*formcheck_checked_binding*/ ctx[170](value);
    	}

    	function formcheck_group_binding(value) {
    		/*formcheck_group_binding*/ ctx[171](value);
    	}

    	function formcheck_value_binding(value) {
    		/*formcheck_value_binding*/ ctx[172](value);
    	}

    	let formcheck_props = {};

    	for (let i = 0; i < formcheck_spread_levels.length; i += 1) {
    		formcheck_props = assign(formcheck_props, formcheck_spread_levels[i]);
    	}

    	if (/*checked*/ ctx[2] !== void 0) {
    		formcheck_props.checked = /*checked*/ ctx[2];
    	}

    	if (/*group*/ ctx[4] !== void 0) {
    		formcheck_props.group = /*group*/ ctx[4];
    	}

    	if (/*value*/ ctx[6] !== void 0) {
    		formcheck_props.value = /*value*/ ctx[6];
    	}

    	formcheck = new FormCheck({ props: formcheck_props, $$inline: true });
    	binding_callbacks.push(() => bind(formcheck, 'checked', formcheck_checked_binding));
    	binding_callbacks.push(() => bind(formcheck, 'group', formcheck_group_binding));
    	binding_callbacks.push(() => bind(formcheck, 'value', formcheck_value_binding));
    	/*formcheck_binding*/ ctx[173](formcheck);
    	formcheck.$on("blur", /*blur_handler_5*/ ctx[174]);
    	formcheck.$on("change", /*change_handler_5*/ ctx[175]);
    	formcheck.$on("focus", /*focus_handler_5*/ ctx[176]);
    	formcheck.$on("input", /*input_handler_5*/ ctx[177]);
    	formcheck.$on("keydown", /*keydown_handler_5*/ ctx[178]);
    	formcheck.$on("keypress", /*keypress_handler_5*/ ctx[179]);
    	formcheck.$on("keyup", /*keyup_handler_5*/ ctx[180]);

    	const block = {
    		c: function create() {
    			create_component(formcheck.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formcheck, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formcheck_changes = (dirty[0] & /*$$restProps, className, bsSize, type, disabled, invalid, label, name, placeholder, readonly, valid*/ 2354561)
    			? get_spread_update(formcheck_spread_levels, [
    					dirty[0] & /*$$restProps*/ 2097152 && get_spread_object(/*$$restProps*/ ctx[21]),
    					dirty[0] & /*className*/ 128 && { class: /*className*/ ctx[7] },
    					dirty[0] & /*bsSize*/ 1 && { size: /*bsSize*/ ctx[0] },
    					dirty[0] & /*type*/ 65536 && { type: /*type*/ ctx[16] },
    					dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    					dirty[0] & /*invalid*/ 1024 && { invalid: /*invalid*/ ctx[10] },
    					dirty[0] & /*label*/ 2048 && { label: /*label*/ ctx[11] },
    					dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    					dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    					dirty[0] & /*readonly*/ 32768 && { readonly: /*readonly*/ ctx[15] },
    					dirty[0] & /*valid*/ 131072 && { valid: /*valid*/ ctx[17] }
    				])
    			: {};

    			if (!updating_checked && dirty[0] & /*checked*/ 4) {
    				updating_checked = true;
    				formcheck_changes.checked = /*checked*/ ctx[2];
    				add_flush_callback(() => updating_checked = false);
    			}

    			if (!updating_group && dirty[0] & /*group*/ 16) {
    				updating_group = true;
    				formcheck_changes.group = /*group*/ ctx[4];
    				add_flush_callback(() => updating_group = false);
    			}

    			if (!updating_value && dirty[0] & /*value*/ 64) {
    				updating_value = true;
    				formcheck_changes.value = /*value*/ ctx[6];
    				add_flush_callback(() => updating_value = false);
    			}

    			formcheck.$set(formcheck_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formcheck.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formcheck.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*formcheck_binding*/ ctx[173](null);
    			destroy_component(formcheck, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(197:73) ",
    		ctx
    	});

    	return block;
    }

    // (174:28) 
    function create_if_block_7(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "file" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ invalid: /*invalid*/ ctx[10] },
    		{ multiple: /*multiple*/ ctx[12] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ valid: /*valid*/ ctx[17] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 174, 4, 3715);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			/*input_binding_4*/ ctx[169](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_4*/ ctx[53], false, false, false),
    					listen_dev(input, "change", /*change_handler_4*/ ctx[54], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_4*/ ctx[55], false, false, false),
    					listen_dev(input, "input", /*input_handler_4*/ ctx[56], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_4*/ ctx[57], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_4*/ ctx[58], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_4*/ ctx[59], false, false, false),
    					listen_dev(input, "change", /*input_change_handler*/ ctx[168])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "file" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*invalid*/ 1024 && { invalid: /*invalid*/ ctx[10] },
    				dirty[0] & /*multiple*/ 4096 && { multiple: /*multiple*/ ctx[12] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*valid*/ 131072 && { valid: /*valid*/ ctx[17] }
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_4*/ ctx[169](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(174:28) ",
    		ctx
    	});

    	return block;
    }

    // (153:29) 
    function create_if_block_6(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "email" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ multiple: /*multiple*/ ctx[12] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 153, 4, 3356);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_3*/ ctx[167](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_3*/ ctx[46], false, false, false),
    					listen_dev(input, "change", /*change_handler_3*/ ctx[47], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_3*/ ctx[48], false, false, false),
    					listen_dev(input, "input", /*input_handler_3*/ ctx[49], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_3*/ ctx[50], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_3*/ ctx[51], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_3*/ ctx[52], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_3*/ ctx[166])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "email" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*multiple*/ 4096 && { multiple: /*multiple*/ ctx[12] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_3*/ ctx[167](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(153:29) ",
    		ctx
    	});

    	return block;
    }

    // (134:29) 
    function create_if_block_5(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "color" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 134, 4, 3026);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_2*/ ctx[165](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_2*/ ctx[39], false, false, false),
    					listen_dev(input, "change", /*change_handler_2*/ ctx[40], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_2*/ ctx[41], false, false, false),
    					listen_dev(input, "input", /*input_handler_2*/ ctx[42], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_2*/ ctx[43], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_2*/ ctx[44], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_2*/ ctx[45], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_2*/ ctx[164])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "color" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] }
    			]));

    			if (dirty[0] & /*value*/ 64) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_2*/ ctx[165](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(134:29) ",
    		ctx
    	});

    	return block;
    }

    // (114:32) 
    function create_if_block_4(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "password" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 114, 4, 2680);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding_1*/ ctx[163](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler_1*/ ctx[32], false, false, false),
    					listen_dev(input, "change", /*change_handler_1*/ ctx[33], false, false, false),
    					listen_dev(input, "focus", /*focus_handler_1*/ ctx[34], false, false, false),
    					listen_dev(input, "input", /*input_handler_1*/ ctx[35], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler_1*/ ctx[36], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler_1*/ ctx[37], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler_1*/ ctx[38], false, false, false),
    					listen_dev(input, "input", /*input_input_handler_1*/ ctx[162])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "password" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding_1*/ ctx[163](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(114:32) ",
    		ctx
    	});

    	return block;
    }

    // (94:2) {#if type === 'text'}
    function create_if_block_3(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	let input_levels = [
    		/*$$restProps*/ ctx[21],
    		{ class: /*classes*/ ctx[18] },
    		{ type: "text" },
    		{ disabled: /*disabled*/ ctx[8] },
    		{ name: /*name*/ ctx[13] },
    		{ placeholder: /*placeholder*/ ctx[14] },
    		{ readOnly: /*readonly*/ ctx[15] },
    		{ size: /*size*/ ctx[1] }
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			set_attributes(input, input_data);
    			add_location(input, file$7, 94, 4, 2335);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			if (input.autofocus) input.focus();
    			set_input_value(input, /*value*/ ctx[6]);
    			/*input_binding*/ ctx[161](input);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "blur", /*blur_handler*/ ctx[25], false, false, false),
    					listen_dev(input, "change", /*change_handler*/ ctx[26], false, false, false),
    					listen_dev(input, "focus", /*focus_handler*/ ctx[27], false, false, false),
    					listen_dev(input, "input", /*input_handler*/ ctx[28], false, false, false),
    					listen_dev(input, "keydown", /*keydown_handler*/ ctx[29], false, false, false),
    					listen_dev(input, "keypress", /*keypress_handler*/ ctx[30], false, false, false),
    					listen_dev(input, "keyup", /*keyup_handler*/ ctx[31], false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[160])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input, input_data = get_spread_update(input_levels, [
    				dirty[0] & /*$$restProps*/ 2097152 && /*$$restProps*/ ctx[21],
    				dirty[0] & /*classes*/ 262144 && { class: /*classes*/ ctx[18] },
    				{ type: "text" },
    				dirty[0] & /*disabled*/ 256 && { disabled: /*disabled*/ ctx[8] },
    				dirty[0] & /*name*/ 8192 && { name: /*name*/ ctx[13] },
    				dirty[0] & /*placeholder*/ 16384 && { placeholder: /*placeholder*/ ctx[14] },
    				dirty[0] & /*readonly*/ 32768 && { readOnly: /*readonly*/ ctx[15] },
    				dirty[0] & /*size*/ 2 && { size: /*size*/ ctx[1] }
    			]));

    			if (dirty[0] & /*value*/ 64 && input.value !== /*value*/ ctx[6]) {
    				set_input_value(input, /*value*/ ctx[6]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[161](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(94:2) {#if type === 'text'}",
    		ctx
    	});

    	return block;
    }

    // (523:0) {#if feedback}
    function create_if_block$2(ctx) {
    	let show_if;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$1, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (dirty[0] & /*feedback*/ 512) show_if = !!Array.isArray(/*feedback*/ ctx[9]);
    		if (show_if) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx, [-1, -1, -1, -1, -1, -1, -1]);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx, dirty);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(523:0) {#if feedback}",
    		ctx
    	});

    	return block;
    }

    // (528:2) {:else}
    function create_else_block$2(ctx) {
    	let formfeedback;
    	let current;

    	formfeedback = new FormFeedback({
    			props: {
    				valid: /*valid*/ ctx[17],
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfeedback.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfeedback, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfeedback_changes = {};
    			if (dirty[0] & /*valid*/ 131072) formfeedback_changes.valid = /*valid*/ ctx[17];

    			if (dirty[0] & /*feedback*/ 512 | dirty[6] & /*$$scope*/ 8388608) {
    				formfeedback_changes.$$scope = { dirty, ctx };
    			}

    			formfeedback.$set(formfeedback_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfeedback.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfeedback.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfeedback, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(528:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (524:2) {#if Array.isArray(feedback)}
    function create_if_block_1$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*feedback*/ ctx[9];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*valid, feedback*/ 131584) {
    				each_value = /*feedback*/ ctx[9];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(524:2) {#if Array.isArray(feedback)}",
    		ctx
    	});

    	return block;
    }

    // (529:4) <FormFeedback {valid}>
    function create_default_slot_1$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*feedback*/ ctx[9]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*feedback*/ 512) set_data_dev(t, /*feedback*/ ctx[9]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(529:4) <FormFeedback {valid}>",
    		ctx
    	});

    	return block;
    }

    // (526:6) <FormFeedback {valid}>
    function create_default_slot$2(ctx) {
    	let t_value = /*msg*/ ctx[210] + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*feedback*/ 512 && t_value !== (t_value = /*msg*/ ctx[210] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(526:6) <FormFeedback {valid}>",
    		ctx
    	});

    	return block;
    }

    // (525:4) {#each feedback as msg}
    function create_each_block$3(ctx) {
    	let formfeedback;
    	let current;

    	formfeedback = new FormFeedback({
    			props: {
    				valid: /*valid*/ ctx[17],
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(formfeedback.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(formfeedback, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formfeedback_changes = {};
    			if (dirty[0] & /*valid*/ 131072) formfeedback_changes.valid = /*valid*/ ctx[17];

    			if (dirty[0] & /*feedback*/ 512 | dirty[6] & /*$$scope*/ 8388608) {
    				formfeedback_changes.$$scope = { dirty, ctx };
    			}

    			formfeedback.$set(formfeedback_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formfeedback.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formfeedback.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formfeedback, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(525:4) {#each feedback as msg}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let current_block_type_index;
    	let if_block0;
    	let t;
    	let if_block1_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$1, create_if_block_21, create_if_block_22];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*tag*/ ctx[19] === 'input') return 0;
    		if (/*tag*/ ctx[19] === 'textarea') return 1;
    		if (/*tag*/ ctx[19] === 'select' && !/*multiple*/ ctx[12]) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	let if_block1 = /*feedback*/ ctx[9] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(t.parentNode, t);
    				} else {
    					if_block0 = null;
    				}
    			}

    			if (/*feedback*/ ctx[9]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*feedback*/ 512) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	const omit_props_names = [
    		"class","bsSize","checked","color","disabled","feedback","files","group","inner","invalid","label","multiple","name","placeholder","plaintext","readonly","size","type","valid","value"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { bsSize = undefined } = $$props;
    	let { checked = false } = $$props;
    	let { color = undefined } = $$props;
    	let { disabled = undefined } = $$props;
    	let { feedback = undefined } = $$props;
    	let { files = undefined } = $$props;
    	let { group = undefined } = $$props;
    	let { inner = undefined } = $$props;
    	let { invalid = false } = $$props;
    	let { label = undefined } = $$props;
    	let { multiple = undefined } = $$props;
    	let { name = '' } = $$props;
    	let { placeholder = '' } = $$props;
    	let { plaintext = false } = $$props;
    	let { readonly = undefined } = $$props;
    	let { size = undefined } = $$props;
    	let { type = 'text' } = $$props;
    	let { valid = false } = $$props;
    	let { value = '' } = $$props;
    	let classes;
    	let tag;

    	const handleInput = event => {
    		$$invalidate(6, value = event.target.value);
    	};

    	function blur_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_2(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_3(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_4(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_6(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_7(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_8(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_9(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_10(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_11(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_12(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_13(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_14(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_15(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_16(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_17(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_18(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function blur_handler_20(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_20(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_19(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_1() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_2() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_2($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_3() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_3($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_change_handler() {
    		files = this.files;
    		value = this.value;
    		$$invalidate(3, files);
    		$$invalidate(6, value);
    	}

    	function input_binding_4($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function formcheck_checked_binding(value) {
    		checked = value;
    		$$invalidate(2, checked);
    	}

    	function formcheck_group_binding(value) {
    		group = value;
    		$$invalidate(4, group);
    	}

    	function formcheck_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(6, value);
    	}

    	function formcheck_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function blur_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function change_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function focus_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keydown_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keypress_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function keyup_handler_5(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_input_handler_4() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_5($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_5() {
    		value = to_number(this.value);
    		$$invalidate(6, value);
    	}

    	function input_binding_6($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_6() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_7($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_7() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_8($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_8() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_9($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_9() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_10($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_10() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_11($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_11() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_12($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_change_input_handler() {
    		value = to_number(this.value);
    		$$invalidate(6, value);
    	}

    	function input_binding_13($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_12() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_14($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_13() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_15($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function input_input_handler_14() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function input_binding_16($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function textarea_input_handler() {
    		value = this.value;
    		$$invalidate(6, value);
    	}

    	function textarea_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	function select_change_handler() {
    		value = select_value(this);
    		$$invalidate(6, value);
    	}

    	function select_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			inner = $$value;
    			$$invalidate(5, inner);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(21, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(7, className = $$new_props.class);
    		if ('bsSize' in $$new_props) $$invalidate(0, bsSize = $$new_props.bsSize);
    		if ('checked' in $$new_props) $$invalidate(2, checked = $$new_props.checked);
    		if ('color' in $$new_props) $$invalidate(22, color = $$new_props.color);
    		if ('disabled' in $$new_props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('feedback' in $$new_props) $$invalidate(9, feedback = $$new_props.feedback);
    		if ('files' in $$new_props) $$invalidate(3, files = $$new_props.files);
    		if ('group' in $$new_props) $$invalidate(4, group = $$new_props.group);
    		if ('inner' in $$new_props) $$invalidate(5, inner = $$new_props.inner);
    		if ('invalid' in $$new_props) $$invalidate(10, invalid = $$new_props.invalid);
    		if ('label' in $$new_props) $$invalidate(11, label = $$new_props.label);
    		if ('multiple' in $$new_props) $$invalidate(12, multiple = $$new_props.multiple);
    		if ('name' in $$new_props) $$invalidate(13, name = $$new_props.name);
    		if ('placeholder' in $$new_props) $$invalidate(14, placeholder = $$new_props.placeholder);
    		if ('plaintext' in $$new_props) $$invalidate(23, plaintext = $$new_props.plaintext);
    		if ('readonly' in $$new_props) $$invalidate(15, readonly = $$new_props.readonly);
    		if ('size' in $$new_props) $$invalidate(1, size = $$new_props.size);
    		if ('type' in $$new_props) $$invalidate(16, type = $$new_props.type);
    		if ('valid' in $$new_props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$new_props) $$invalidate(6, value = $$new_props.value);
    		if ('$$scope' in $$new_props) $$invalidate(209, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		FormCheck,
    		FormFeedback,
    		classnames,
    		className,
    		bsSize,
    		checked,
    		color,
    		disabled,
    		feedback,
    		files,
    		group,
    		inner,
    		invalid,
    		label,
    		multiple,
    		name,
    		placeholder,
    		plaintext,
    		readonly,
    		size,
    		type,
    		valid,
    		value,
    		classes,
    		tag,
    		handleInput
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('className' in $$props) $$invalidate(7, className = $$new_props.className);
    		if ('bsSize' in $$props) $$invalidate(0, bsSize = $$new_props.bsSize);
    		if ('checked' in $$props) $$invalidate(2, checked = $$new_props.checked);
    		if ('color' in $$props) $$invalidate(22, color = $$new_props.color);
    		if ('disabled' in $$props) $$invalidate(8, disabled = $$new_props.disabled);
    		if ('feedback' in $$props) $$invalidate(9, feedback = $$new_props.feedback);
    		if ('files' in $$props) $$invalidate(3, files = $$new_props.files);
    		if ('group' in $$props) $$invalidate(4, group = $$new_props.group);
    		if ('inner' in $$props) $$invalidate(5, inner = $$new_props.inner);
    		if ('invalid' in $$props) $$invalidate(10, invalid = $$new_props.invalid);
    		if ('label' in $$props) $$invalidate(11, label = $$new_props.label);
    		if ('multiple' in $$props) $$invalidate(12, multiple = $$new_props.multiple);
    		if ('name' in $$props) $$invalidate(13, name = $$new_props.name);
    		if ('placeholder' in $$props) $$invalidate(14, placeholder = $$new_props.placeholder);
    		if ('plaintext' in $$props) $$invalidate(23, plaintext = $$new_props.plaintext);
    		if ('readonly' in $$props) $$invalidate(15, readonly = $$new_props.readonly);
    		if ('size' in $$props) $$invalidate(1, size = $$new_props.size);
    		if ('type' in $$props) $$invalidate(16, type = $$new_props.type);
    		if ('valid' in $$props) $$invalidate(17, valid = $$new_props.valid);
    		if ('value' in $$props) $$invalidate(6, value = $$new_props.value);
    		if ('classes' in $$props) $$invalidate(18, classes = $$new_props.classes);
    		if ('tag' in $$props) $$invalidate(19, tag = $$new_props.tag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*type, color, plaintext, size, className, invalid, valid, bsSize*/ 12780675) {
    			{
    				const isNotaNumber = new RegExp('\\D', 'g');
    				let isBtn = false;
    				let formControlClass = 'form-control';
    				$$invalidate(19, tag = 'input');

    				switch (type) {
    					case 'color':
    						formControlClass = `form-control form-control-color`;
    						break;
    					case 'range':
    						formControlClass = 'form-range';
    						break;
    					case 'select':
    						formControlClass = `form-select`;
    						$$invalidate(19, tag = 'select');
    						break;
    					case 'textarea':
    						$$invalidate(19, tag = 'textarea');
    						break;
    					case 'button':
    					case 'reset':
    					case 'submit':
    						formControlClass = `btn btn-${color || 'secondary'}`;
    						isBtn = true;
    						break;
    					case 'hidden':
    					case 'image':
    						formControlClass = undefined;
    						break;
    					default:
    						formControlClass = 'form-control';
    						$$invalidate(19, tag = 'input');
    				}

    				if (plaintext) {
    					formControlClass = `${formControlClass}-plaintext`;
    					$$invalidate(19, tag = 'input');
    				}

    				if (size && isNotaNumber.test(size)) {
    					console.warn('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.');
    					$$invalidate(0, bsSize = size);
    					$$invalidate(1, size = undefined);
    				}

    				$$invalidate(18, classes = classnames(className, formControlClass, {
    					'is-invalid': invalid,
    					'is-valid': valid,
    					[`form-control-${bsSize}`]: bsSize && !isBtn,
    					[`btn-${bsSize}`]: bsSize && isBtn
    				}));
    			}
    		}
    	};

    	return [
    		bsSize,
    		size,
    		checked,
    		files,
    		group,
    		inner,
    		value,
    		className,
    		disabled,
    		feedback,
    		invalid,
    		label,
    		multiple,
    		name,
    		placeholder,
    		readonly,
    		type,
    		valid,
    		classes,
    		tag,
    		handleInput,
    		$$restProps,
    		color,
    		plaintext,
    		slots,
    		blur_handler,
    		change_handler,
    		focus_handler,
    		input_handler,
    		keydown_handler,
    		keypress_handler,
    		keyup_handler,
    		blur_handler_1,
    		change_handler_1,
    		focus_handler_1,
    		input_handler_1,
    		keydown_handler_1,
    		keypress_handler_1,
    		keyup_handler_1,
    		blur_handler_2,
    		change_handler_2,
    		focus_handler_2,
    		input_handler_2,
    		keydown_handler_2,
    		keypress_handler_2,
    		keyup_handler_2,
    		blur_handler_3,
    		change_handler_3,
    		focus_handler_3,
    		input_handler_3,
    		keydown_handler_3,
    		keypress_handler_3,
    		keyup_handler_3,
    		blur_handler_4,
    		change_handler_4,
    		focus_handler_4,
    		input_handler_4,
    		keydown_handler_4,
    		keypress_handler_4,
    		keyup_handler_4,
    		blur_handler_6,
    		change_handler_6,
    		focus_handler_6,
    		input_handler_6,
    		keydown_handler_6,
    		keypress_handler_6,
    		keyup_handler_6,
    		blur_handler_7,
    		change_handler_7,
    		focus_handler_7,
    		input_handler_7,
    		keydown_handler_7,
    		keypress_handler_7,
    		keyup_handler_7,
    		blur_handler_8,
    		change_handler_8,
    		focus_handler_8,
    		input_handler_8,
    		keydown_handler_8,
    		keypress_handler_8,
    		keyup_handler_8,
    		blur_handler_9,
    		change_handler_9,
    		focus_handler_9,
    		input_handler_9,
    		keydown_handler_9,
    		keypress_handler_9,
    		keyup_handler_9,
    		blur_handler_10,
    		change_handler_10,
    		focus_handler_10,
    		input_handler_10,
    		keydown_handler_10,
    		keypress_handler_10,
    		keyup_handler_10,
    		blur_handler_11,
    		change_handler_11,
    		focus_handler_11,
    		input_handler_11,
    		keydown_handler_11,
    		keypress_handler_11,
    		keyup_handler_11,
    		blur_handler_12,
    		change_handler_12,
    		focus_handler_12,
    		input_handler_12,
    		keydown_handler_12,
    		keypress_handler_12,
    		keyup_handler_12,
    		blur_handler_13,
    		change_handler_13,
    		focus_handler_13,
    		input_handler_13,
    		keydown_handler_13,
    		keypress_handler_13,
    		keyup_handler_13,
    		blur_handler_14,
    		change_handler_14,
    		focus_handler_14,
    		input_handler_14,
    		keydown_handler_14,
    		keypress_handler_14,
    		keyup_handler_14,
    		blur_handler_15,
    		change_handler_15,
    		focus_handler_15,
    		input_handler_15,
    		keydown_handler_15,
    		keypress_handler_15,
    		keyup_handler_15,
    		blur_handler_16,
    		change_handler_16,
    		focus_handler_16,
    		input_handler_16,
    		keydown_handler_16,
    		keypress_handler_16,
    		keyup_handler_16,
    		blur_handler_17,
    		change_handler_17,
    		focus_handler_17,
    		input_handler_17,
    		keydown_handler_17,
    		keypress_handler_17,
    		keyup_handler_17,
    		blur_handler_18,
    		focus_handler_18,
    		keydown_handler_18,
    		keypress_handler_18,
    		keyup_handler_18,
    		blur_handler_19,
    		change_handler_18,
    		focus_handler_19,
    		input_handler_18,
    		keydown_handler_19,
    		keypress_handler_19,
    		keyup_handler_19,
    		blur_handler_20,
    		change_handler_19,
    		focus_handler_20,
    		input_handler_19,
    		input_input_handler,
    		input_binding,
    		input_input_handler_1,
    		input_binding_1,
    		input_input_handler_2,
    		input_binding_2,
    		input_input_handler_3,
    		input_binding_3,
    		input_change_handler,
    		input_binding_4,
    		formcheck_checked_binding,
    		formcheck_group_binding,
    		formcheck_value_binding,
    		formcheck_binding,
    		blur_handler_5,
    		change_handler_5,
    		focus_handler_5,
    		input_handler_5,
    		keydown_handler_5,
    		keypress_handler_5,
    		keyup_handler_5,
    		input_input_handler_4,
    		input_binding_5,
    		input_input_handler_5,
    		input_binding_6,
    		input_input_handler_6,
    		input_binding_7,
    		input_input_handler_7,
    		input_binding_8,
    		input_input_handler_8,
    		input_binding_9,
    		input_input_handler_9,
    		input_binding_10,
    		input_input_handler_10,
    		input_binding_11,
    		input_input_handler_11,
    		input_binding_12,
    		input_change_input_handler,
    		input_binding_13,
    		input_input_handler_12,
    		input_binding_14,
    		input_input_handler_13,
    		input_binding_15,
    		input_input_handler_14,
    		input_binding_16,
    		textarea_input_handler,
    		textarea_binding,
    		select_change_handler,
    		select_binding,
    		$$scope
    	];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$7,
    			create_fragment$7,
    			safe_not_equal,
    			{
    				class: 7,
    				bsSize: 0,
    				checked: 2,
    				color: 22,
    				disabled: 8,
    				feedback: 9,
    				files: 3,
    				group: 4,
    				inner: 5,
    				invalid: 10,
    				label: 11,
    				multiple: 12,
    				name: 13,
    				placeholder: 14,
    				plaintext: 23,
    				readonly: 15,
    				size: 1,
    				type: 16,
    				valid: 17,
    				value: 6
    			},
    			null,
    			[-1, -1, -1, -1, -1, -1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get class() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bsSize() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bsSize(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get checked() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set checked(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get feedback() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set feedback(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get files() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set files(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inner() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inner(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get invalid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set invalid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get multiple() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set multiple(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get plaintext() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set plaintext(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readonly() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readonly(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get valid() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set valid(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Label.svelte generated by Svelte v3.42.1 */
    const file$6 = "node_modules\\sveltestrap\\src\\Label.svelte";

    function create_fragment$6(ctx) {
    	let label;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[15].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);

    	let label_levels = [
    		/*$$restProps*/ ctx[2],
    		{ class: /*classes*/ ctx[1] },
    		{ for: /*fore*/ ctx[0] }
    	];

    	let label_data = {};

    	for (let i = 0; i < label_levels.length; i += 1) {
    		label_data = assign(label_data, label_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			label = element("label");
    			if (default_slot) default_slot.c();
    			set_attributes(label, label_data);
    			add_location(label, file$6, 71, 0, 1672);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);

    			if (default_slot) {
    				default_slot.m(label, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[14],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(label, label_data = get_spread_update(label_levels, [
    				dirty & /*$$restProps*/ 4 && /*$$restProps*/ ctx[2],
    				(!current || dirty & /*classes*/ 2) && { class: /*classes*/ ctx[1] },
    				(!current || dirty & /*fore*/ 1) && { for: /*fore*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","hidden","check","size","for","xs","sm","md","lg","xl","xxl","widths"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Label', slots, ['default']);
    	let { class: className = '' } = $$props;
    	let { hidden = false } = $$props;
    	let { check = false } = $$props;
    	let { size = '' } = $$props;
    	let { for: fore = null } = $$props;
    	let { xs = '' } = $$props;
    	let { sm = '' } = $$props;
    	let { md = '' } = $$props;
    	let { lg = '' } = $$props;
    	let { xl = '' } = $$props;
    	let { xxl = '' } = $$props;
    	const colWidths = { xs, sm, md, lg, xl, xxl };
    	let { widths = Object.keys(colWidths) } = $$props;
    	const colClasses = [];

    	widths.forEach(colWidth => {
    		let columnProp = $$props[colWidth];

    		if (!columnProp && columnProp !== '') {
    			return;
    		}

    		const isXs = colWidth === 'xs';
    		let colClass;

    		if (isObject(columnProp)) {
    			const colSizeInterfix = isXs ? '-' : `-${colWidth}-`;
    			colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

    			colClasses.push(classnames({
    				[colClass]: columnProp.size || columnProp.size === '',
    				[`order${colSizeInterfix}${columnProp.order}`]: columnProp.order || columnProp.order === 0,
    				[`offset${colSizeInterfix}${columnProp.offset}`]: columnProp.offset || columnProp.offset === 0
    			}));
    		} else {
    			colClass = getColumnSizeClass(isXs, colWidth, columnProp);
    			colClasses.push(colClass);
    		}
    	});

    	$$self.$$set = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('class' in $$new_props) $$invalidate(3, className = $$new_props.class);
    		if ('hidden' in $$new_props) $$invalidate(4, hidden = $$new_props.hidden);
    		if ('check' in $$new_props) $$invalidate(5, check = $$new_props.check);
    		if ('size' in $$new_props) $$invalidate(6, size = $$new_props.size);
    		if ('for' in $$new_props) $$invalidate(0, fore = $$new_props.for);
    		if ('xs' in $$new_props) $$invalidate(7, xs = $$new_props.xs);
    		if ('sm' in $$new_props) $$invalidate(8, sm = $$new_props.sm);
    		if ('md' in $$new_props) $$invalidate(9, md = $$new_props.md);
    		if ('lg' in $$new_props) $$invalidate(10, lg = $$new_props.lg);
    		if ('xl' in $$new_props) $$invalidate(11, xl = $$new_props.xl);
    		if ('xxl' in $$new_props) $$invalidate(12, xxl = $$new_props.xxl);
    		if ('widths' in $$new_props) $$invalidate(13, widths = $$new_props.widths);
    		if ('$$scope' in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		getColumnSizeClass,
    		isObject,
    		className,
    		hidden,
    		check,
    		size,
    		fore,
    		xs,
    		sm,
    		md,
    		lg,
    		xl,
    		xxl,
    		colWidths,
    		widths,
    		colClasses,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(18, $$props = assign(assign({}, $$props), $$new_props));
    		if ('className' in $$props) $$invalidate(3, className = $$new_props.className);
    		if ('hidden' in $$props) $$invalidate(4, hidden = $$new_props.hidden);
    		if ('check' in $$props) $$invalidate(5, check = $$new_props.check);
    		if ('size' in $$props) $$invalidate(6, size = $$new_props.size);
    		if ('fore' in $$props) $$invalidate(0, fore = $$new_props.fore);
    		if ('xs' in $$props) $$invalidate(7, xs = $$new_props.xs);
    		if ('sm' in $$props) $$invalidate(8, sm = $$new_props.sm);
    		if ('md' in $$props) $$invalidate(9, md = $$new_props.md);
    		if ('lg' in $$props) $$invalidate(10, lg = $$new_props.lg);
    		if ('xl' in $$props) $$invalidate(11, xl = $$new_props.xl);
    		if ('xxl' in $$props) $$invalidate(12, xxl = $$new_props.xxl);
    		if ('widths' in $$props) $$invalidate(13, widths = $$new_props.widths);
    		if ('classes' in $$props) $$invalidate(1, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, hidden, check, size*/ 120) {
    			$$invalidate(1, classes = classnames(className, hidden ? 'visually-hidden' : false, check ? 'form-check-label' : false, size ? `col-form-label-${size}` : false, colClasses, colClasses.length ? 'col-form-label' : 'form-label'));
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		fore,
    		classes,
    		$$restProps,
    		className,
    		hidden,
    		check,
    		size,
    		xs,
    		sm,
    		md,
    		lg,
    		xl,
    		xxl,
    		widths,
    		$$scope,
    		slots
    	];
    }

    class Label extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
    			class: 3,
    			hidden: 4,
    			check: 5,
    			size: 6,
    			for: 0,
    			xs: 7,
    			sm: 8,
    			md: 9,
    			lg: 10,
    			xl: 11,
    			xxl: 12,
    			widths: 13
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Label",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get class() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hidden() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hidden(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get check() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set check(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get for() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set for(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xs() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xs(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sm() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sm(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get md() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set md(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lg() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lg(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xl() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xl(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xxl() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xxl(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get widths() {
    		throw new Error("<Label>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set widths(value) {
    		throw new Error("<Label>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\FormVote.svelte generated by Svelte v3.42.1 */
    const file$5 = "src\\components\\FormVote.svelte";

    // (60:12) <Label for="statement">
    function create_default_slot_9(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Enunciado da votação");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(60:12) <Label for=\\\"statement\\\">",
    		ctx
    	});

    	return block;
    }

    // (59:8) <FormGroup>
    function create_default_slot_8(ctx) {
    	let label;
    	let t;
    	let input;
    	let updating_value;
    	let current;

    	label = new Label({
    			props: {
    				for: "statement",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding(value) {
    		/*input_value_binding*/ ctx[5](value);
    	}

    	let input_props = {
    		type: "textarea",
    		name: "statement",
    		placeholder: "Digite o enunciado...",
    		invalid: /*errors*/ ctx[1].statement,
    		feedback: /*errors*/ ctx[1].statement
    	};

    	if (/*values*/ ctx[0].statement !== void 0) {
    		input_props.value = /*values*/ ctx[0].statement;
    	}

    	input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, 'value', input_value_binding));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};
    			if (dirty & /*errors*/ 2) input_changes.invalid = /*errors*/ ctx[1].statement;
    			if (dirty & /*errors*/ 2) input_changes.feedback = /*errors*/ ctx[1].statement;

    			if (!updating_value && dirty & /*values*/ 1) {
    				updating_value = true;
    				input_changes.value = /*values*/ ctx[0].statement;
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(59:8) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (71:12) <Label for="option1">
    function create_default_slot_7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Opção 1");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(71:12) <Label for=\\\"option1\\\">",
    		ctx
    	});

    	return block;
    }

    // (70:8) <FormGroup>
    function create_default_slot_6(ctx) {
    	let label;
    	let t;
    	let input;
    	let updating_value;
    	let current;

    	label = new Label({
    			props: {
    				for: "option1",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding_1(value) {
    		/*input_value_binding_1*/ ctx[6](value);
    	}

    	let input_props = {
    		type: "text",
    		name: "option1",
    		placeholder: "Opção 1...",
    		invalid: /*errors*/ ctx[1].option1,
    		feedback: /*errors*/ ctx[1].option1
    	};

    	if (/*values*/ ctx[0].option1 !== void 0) {
    		input_props.value = /*values*/ ctx[0].option1;
    	}

    	input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, 'value', input_value_binding_1));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};
    			if (dirty & /*errors*/ 2) input_changes.invalid = /*errors*/ ctx[1].option1;
    			if (dirty & /*errors*/ 2) input_changes.feedback = /*errors*/ ctx[1].option1;

    			if (!updating_value && dirty & /*values*/ 1) {
    				updating_value = true;
    				input_changes.value = /*values*/ ctx[0].option1;
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(70:8) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (82:12) <Label for="option2">
    function create_default_slot_5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Opção 2");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(82:12) <Label for=\\\"option2\\\">",
    		ctx
    	});

    	return block;
    }

    // (81:8) <FormGroup>
    function create_default_slot_4(ctx) {
    	let label;
    	let t;
    	let input;
    	let updating_value;
    	let current;

    	label = new Label({
    			props: {
    				for: "option2",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding_2(value) {
    		/*input_value_binding_2*/ ctx[7](value);
    	}

    	let input_props = {
    		type: "text",
    		name: "option2",
    		placeholder: "Opção 2...",
    		invalid: /*errors*/ ctx[1].option2,
    		feedback: /*errors*/ ctx[1].option2
    	};

    	if (/*values*/ ctx[0].option2 !== void 0) {
    		input_props.value = /*values*/ ctx[0].option2;
    	}

    	input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, 'value', input_value_binding_2));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};
    			if (dirty & /*errors*/ 2) input_changes.invalid = /*errors*/ ctx[1].option2;
    			if (dirty & /*errors*/ 2) input_changes.feedback = /*errors*/ ctx[1].option2;

    			if (!updating_value && dirty & /*values*/ 1) {
    				updating_value = true;
    				input_changes.value = /*values*/ ctx[0].option2;
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(81:8) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (93:12) <Label for="option3">
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Opção 3");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(93:12) <Label for=\\\"option3\\\">",
    		ctx
    	});

    	return block;
    }

    // (92:8) <FormGroup>
    function create_default_slot_2$1(ctx) {
    	let label;
    	let t;
    	let input;
    	let updating_value;
    	let current;

    	label = new Label({
    			props: {
    				for: "option3",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_value_binding_3(value) {
    		/*input_value_binding_3*/ ctx[8](value);
    	}

    	let input_props = {
    		type: "text",
    		name: "option3",
    		placeholder: "Opção 3..."
    	};

    	if (/*values*/ ctx[0].option3 !== void 0) {
    		input_props.value = /*values*/ ctx[0].option3;
    	}

    	input = new Input({ props: input_props, $$inline: true });
    	binding_callbacks.push(() => bind(input, 'value', input_value_binding_3));

    	const block = {
    		c: function create() {
    			create_component(label.$$.fragment);
    			t = space();
    			create_component(input.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(label, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(input, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const label_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				label_changes.$$scope = { dirty, ctx };
    			}

    			label.$set(label_changes);
    			const input_changes = {};

    			if (!updating_value && dirty & /*values*/ 1) {
    				updating_value = true;
    				input_changes.value = /*values*/ ctx[0].option3;
    				add_flush_callback(() => updating_value = false);
    			}

    			input.$set(input_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(label.$$.fragment, local);
    			transition_in(input.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(label.$$.fragment, local);
    			transition_out(input.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(label, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(input, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(92:8) <FormGroup>",
    		ctx
    	});

    	return block;
    }

    // (101:8) <Button color="primary" type="submit">
    function create_default_slot_1$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Enviar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(101:8) <Button color=\\\"primary\\\" type=\\\"submit\\\">",
    		ctx
    	});

    	return block;
    }

    // (102:8) <Button color="secondary" on:click={(e) => dispatch("cancel")}              >
    function create_default_slot$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Cancelar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(102:8) <Button color=\\\"secondary\\\" on:click={(e) => dispatch(\\\"cancel\\\")}              >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let form;
    	let formgroup0;
    	let t2;
    	let formgroup1;
    	let t3;
    	let formgroup2;
    	let t4;
    	let formgroup3;
    	let t5;
    	let button0;
    	let t6;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;

    	formgroup0 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formgroup1 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formgroup2 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	formgroup3 = new FormGroup({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0 = new Button({
    			props: {
    				color: "primary",
    				type: "submit",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				color: "secondary",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", /*click_handler*/ ctx[9]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Formulário";
    			t1 = space();
    			form = element("form");
    			create_component(formgroup0.$$.fragment);
    			t2 = space();
    			create_component(formgroup1.$$.fragment);
    			t3 = space();
    			create_component(formgroup2.$$.fragment);
    			t4 = space();
    			create_component(formgroup3.$$.fragment);
    			t5 = space();
    			create_component(button0.$$.fragment);
    			t6 = space();
    			create_component(button1.$$.fragment);
    			add_location(h2, file$5, 56, 4, 1506);
    			add_location(form, file$5, 57, 4, 1531);
    			add_location(div, file$5, 55, 0, 1495);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, form);
    			mount_component(formgroup0, form, null);
    			append_dev(form, t2);
    			mount_component(formgroup1, form, null);
    			append_dev(form, t3);
    			mount_component(formgroup2, form, null);
    			append_dev(form, t4);
    			mount_component(formgroup3, form, null);
    			append_dev(form, t5);
    			mount_component(button0, form, null);
    			append_dev(form, t6);
    			mount_component(button1, form, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", prevent_default(/*submitHandler*/ ctx[3]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const formgroup0_changes = {};

    			if (dirty & /*$$scope, errors, values*/ 65539) {
    				formgroup0_changes.$$scope = { dirty, ctx };
    			}

    			formgroup0.$set(formgroup0_changes);
    			const formgroup1_changes = {};

    			if (dirty & /*$$scope, errors, values*/ 65539) {
    				formgroup1_changes.$$scope = { dirty, ctx };
    			}

    			formgroup1.$set(formgroup1_changes);
    			const formgroup2_changes = {};

    			if (dirty & /*$$scope, errors, values*/ 65539) {
    				formgroup2_changes.$$scope = { dirty, ctx };
    			}

    			formgroup2.$set(formgroup2_changes);
    			const formgroup3_changes = {};

    			if (dirty & /*$$scope, values*/ 65537) {
    				formgroup3_changes.$$scope = { dirty, ctx };
    			}

    			formgroup3.$set(formgroup3_changes);
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formgroup0.$$.fragment, local);
    			transition_in(formgroup1.$$.fragment, local);
    			transition_in(formgroup2.$$.fragment, local);
    			transition_in(formgroup3.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formgroup0.$$.fragment, local);
    			transition_out(formgroup1.$$.fragment, local);
    			transition_out(formgroup2.$$.fragment, local);
    			transition_out(formgroup3.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(formgroup0);
    			destroy_component(formgroup1);
    			destroy_component(formgroup2);
    			destroy_component(formgroup3);
    			destroy_component(button0);
    			destroy_component(button1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormVote', slots, []);
    	const dispatch = createEventDispatcher();
    	let { vote } = $$props;
    	const { statement, options } = vote || {};
    	const [option1, option2, option3] = options || [];
    	let values = { statement, option1, option2, option3 };
    	let errors = {};

    	const extractErrors = err => {
    		return err.inner.reduce(
    			(acc, err) => {
    				return { ...acc, [err.path]: err.message };
    			},
    			{}
    		);
    	};

    	const submitHandler = () => {
    		schema.validate(values, { abortEarly: false }).then(() => {
    			const fullOptions = [values.option1, values.option2, values.option3];
    			const filteredOptions = fullOptions.filter(option => option && option.trim() !== "");

    			dispatch("update", {
    				statement: values.statement,
    				options: filteredOptions
    			});

    			$$invalidate(1, errors = {});
    		}).catch(err => $$invalidate(1, errors = extractErrors(err)));
    	};

    	const writable_props = ['vote'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FormVote> was created with unknown prop '${key}'`);
    	});

    	function input_value_binding(value) {
    		if ($$self.$$.not_equal(values.statement, value)) {
    			values.statement = value;
    			$$invalidate(0, values);
    		}
    	}

    	function input_value_binding_1(value) {
    		if ($$self.$$.not_equal(values.option1, value)) {
    			values.option1 = value;
    			$$invalidate(0, values);
    		}
    	}

    	function input_value_binding_2(value) {
    		if ($$self.$$.not_equal(values.option2, value)) {
    			values.option2 = value;
    			$$invalidate(0, values);
    		}
    	}

    	function input_value_binding_3(value) {
    		if ($$self.$$.not_equal(values.option3, value)) {
    			values.option3 = value;
    			$$invalidate(0, values);
    		}
    	}

    	const click_handler = e => dispatch("cancel");

    	$$self.$$set = $$props => {
    		if ('vote' in $$props) $$invalidate(4, vote = $$props.vote);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		schema,
    		Button,
    		Form,
    		FormGroup,
    		FormText,
    		Input,
    		Label,
    		dispatch,
    		vote,
    		statement,
    		options,
    		option1,
    		option2,
    		option3,
    		values,
    		errors,
    		extractErrors,
    		submitHandler
    	});

    	$$self.$inject_state = $$props => {
    		if ('vote' in $$props) $$invalidate(4, vote = $$props.vote);
    		if ('values' in $$props) $$invalidate(0, values = $$props.values);
    		if ('errors' in $$props) $$invalidate(1, errors = $$props.errors);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		values,
    		errors,
    		dispatch,
    		submitHandler,
    		vote,
    		input_value_binding,
    		input_value_binding_1,
    		input_value_binding_2,
    		input_value_binding_3,
    		click_handler
    	];
    }

    class FormVote extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { vote: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormVote",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*vote*/ ctx[4] === undefined && !('vote' in props)) {
    			console.warn("<FormVote> was created without expected prop 'vote'");
    		}
    	}

    	get vote() {
    		throw new Error("<FormVote>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set vote(value) {
    		throw new Error("<FormVote>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Cabine.svelte generated by Svelte v3.42.1 */
    const file$4 = "src\\components\\Cabine.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (9:4) {#each options as option, index (option)}
    function create_each_block$2(key_1, ctx) {
    	let button;
    	let t0_value = /*option*/ ctx[2].option + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(button, "class", "svelte-1xmppmc");
    			add_location(button, file$4, 9, 8, 228);
    			this.first = button;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t0);
    			append_dev(button, t1);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*dispatch*/ ctx[1]("click", /*index*/ ctx[4]))) /*dispatch*/ ctx[1]("click", /*index*/ ctx[4]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*options*/ 1 && t0_value !== (t0_value = /*option*/ ctx[2].option + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(9:4) {#each options as option, index (option)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value = /*options*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*option*/ ctx[2];
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "options svelte-1xmppmc");
    			add_location(div, file$4, 7, 0, 150);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*dispatch, options*/ 3) {
    				each_value = /*options*/ ctx[0];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$2, null, get_each_context$2);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Cabine', slots, []);
    	let { options } = $$props;
    	const dispatch = createEventDispatcher();
    	const writable_props = ['options'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Cabine> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('options' in $$props) $$invalidate(0, options = $$props.options);
    	};

    	$$self.$capture_state = () => ({ createEventDispatcher, options, dispatch });

    	$$self.$inject_state = $$props => {
    		if ('options' in $$props) $$invalidate(0, options = $$props.options);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [options, dispatch];
    }

    class Cabine extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { options: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cabine",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*options*/ ctx[0] === undefined && !('options' in props)) {
    			console.warn("<Cabine> was created without expected prop 'options'");
    		}
    	}

    	get options() {
    		throw new Error("<Cabine>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Cabine>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Resultado.svelte generated by Svelte v3.42.1 */

    const file$3 = "src\\components\\Resultado.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (15:4) {#each options as option, index (index)}
    function create_each_block$1(key_1, ctx) {
    	let p;
    	let t0_value = /*index*/ ctx[6] + 1 + "";
    	let t0;
    	let t1;
    	let t2_value = /*option*/ ctx[4].option + "";
    	let t2;
    	let t3;
    	let t4_value = /*option*/ ctx[4].count + "";
    	let t4;
    	let t5;
    	let t6_value = parseInt(/*option*/ ctx[4].count / /*total*/ ctx[2]() * 100) + "";
    	let t6;
    	let t7;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = text(". ");
    			t2 = text(t2_value);
    			t3 = text(" - ");
    			t4 = text(t4_value);
    			t5 = text(" votos (");
    			t6 = text(t6_value);
    			t7 = text("%)\r\n        ");
    			set_style(p, "color", /*color*/ ctx[1]);
    			attr_dev(p, "class", "svelte-6b863v");
    			add_location(p, file$3, 15, 8, 320);
    			this.first = p;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(p, t5);
    			append_dev(p, t6);
    			append_dev(p, t7);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*options*/ 1 && t0_value !== (t0_value = /*index*/ ctx[6] + 1 + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*options*/ 1 && t2_value !== (t2_value = /*option*/ ctx[4].option + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*options*/ 1 && t4_value !== (t4_value = /*option*/ ctx[4].count + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*options*/ 1 && t6_value !== (t6_value = parseInt(/*option*/ ctx[4].count / /*total*/ ctx[2]() * 100) + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*color*/ 2) {
    				set_style(p, "color", /*color*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(15:4) {#each options as option, index (index)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value = /*options*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*index*/ ctx[6];
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "svelte-6b863v");
    			add_location(div, file$3, 13, 0, 259);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color, parseInt, options, total*/ 7) {
    				each_value = /*options*/ ctx[0];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$1, null, get_each_context$1);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Resultado', slots, []);
    	let { options } = $$props;
    	let { color = "#fff" } = $$props;
    	let totalVotos = 0;

    	function total() {
    		options.forEach(option => {
    			totalVotos += option.count;
    		});

    		return totalVotos;
    	}

    	const writable_props = ['options', 'color'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Resultado> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('options' in $$props) $$invalidate(0, options = $$props.options);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    	};

    	$$self.$capture_state = () => ({ options, color, totalVotos, total });

    	$$self.$inject_state = $$props => {
    		if ('options' in $$props) $$invalidate(0, options = $$props.options);
    		if ('color' in $$props) $$invalidate(1, color = $$props.color);
    		if ('totalVotos' in $$props) totalVotos = $$props.totalVotos;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [options, color, total];
    }

    class Resultado extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { options: 0, color: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Resultado",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*options*/ ctx[0] === undefined && !('options' in props)) {
    			console.warn("<Resultado> was created without expected prop 'options'");
    		}
    	}

    	get options() {
    		throw new Error("<Resultado>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Resultado>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Resultado>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Resultado>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\CardVotacao.svelte generated by Svelte v3.42.1 */
    const file$2 = "src\\components\\CardVotacao.svelte";

    // (24:4) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let resultado;
    	let current;

    	resultado = new Resultado({
    			props: { options: /*options*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(resultado.$$.fragment);
    			add_location(div, file$2, 24, 8, 534);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(resultado, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const resultado_changes = {};
    			if (dirty & /*options*/ 1) resultado_changes.options = /*options*/ ctx[0];
    			resultado.$set(resultado_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(resultado.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(resultado.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(resultado);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(24:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (20:4) {#if mode === "open"}
    function create_if_block$1(ctx) {
    	let div;
    	let cabine;
    	let current;

    	cabine = new Cabine({
    			props: { options: /*options*/ ctx[0] },
    			$$inline: true
    		});

    	cabine.$on("click", /*votar*/ ctx[3]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(cabine.$$.fragment);
    			add_location(div, file$2, 20, 8, 439);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(cabine, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const cabine_changes = {};
    			if (dirty & /*options*/ 1) cabine_changes.options = /*options*/ ctx[0];
    			cabine.$set(cabine_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cabine.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cabine.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(cabine);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(20:4) {#if mode === \\\"open\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t0;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[1] === "open") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			t0 = text(/*statement*/ ctx[2]);
    			t1 = space();
    			if_block.c();
    			attr_dev(h2, "class", "svelte-bz33lb");
    			add_location(h2, file$2, 17, 8, 370);
    			attr_dev(div0, "class", "question svelte-bz33lb");
    			add_location(div0, file$2, 16, 4, 338);
    			attr_dev(div1, "class", "container svelte-bz33lb");
    			add_location(div1, file$2, 15, 0, 309);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t0);
    			append_dev(div1, t1);
    			if_blocks[current_block_type_index].m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*statement*/ 4) set_data_dev(t0, /*statement*/ ctx[2]);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CardVotacao', slots, []);
    	let { statement } = $$props;
    	let { options } = $$props;
    	let { mode = "open" } = $$props;

    	function votar(event) {
    		$$invalidate(0, options[event.detail].count += 1, options);
    		$$invalidate(1, mode = "closed");
    	}

    	const writable_props = ['statement', 'options', 'mode'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CardVotacao> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('statement' in $$props) $$invalidate(2, statement = $$props.statement);
    		if ('options' in $$props) $$invalidate(0, options = $$props.options);
    		if ('mode' in $$props) $$invalidate(1, mode = $$props.mode);
    	};

    	$$self.$capture_state = () => ({
    		Cabine,
    		Resultado,
    		statement,
    		options,
    		mode,
    		votar
    	});

    	$$self.$inject_state = $$props => {
    		if ('statement' in $$props) $$invalidate(2, statement = $$props.statement);
    		if ('options' in $$props) $$invalidate(0, options = $$props.options);
    		if ('mode' in $$props) $$invalidate(1, mode = $$props.mode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [options, mode, statement, votar];
    }

    class CardVotacao extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { statement: 2, options: 0, mode: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CardVotacao",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*statement*/ ctx[2] === undefined && !('statement' in props)) {
    			console.warn("<CardVotacao> was created without expected prop 'statement'");
    		}

    		if (/*options*/ ctx[0] === undefined && !('options' in props)) {
    			console.warn("<CardVotacao> was created without expected prop 'options'");
    		}
    	}

    	get statement() {
    		throw new Error("<CardVotacao>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set statement(value) {
    		throw new Error("<CardVotacao>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<CardVotacao>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<CardVotacao>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mode() {
    		throw new Error("<CardVotacao>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mode(value) {
    		throw new Error("<CardVotacao>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const voteList = writable([]);

    function createVoteList() {
        const { subscribe, update } = writable([]);

        function create() {
            const newVt = {
                statement: '', options: []
            };
            update((list) => [...list, newVt]);
        }

        function change(vote, index) {
            update((list) => [
                ...list.slice(0, index),
                vote,
                ...list.slice(index + 1)
            ]);
        }

        function remove(index) {
            update((list) => [
                ...list.slice(0, index),
                ...list.slice(index + 1)
            ]);
        }

        return { subscribe, create, change, remove }
    }

    /* src\components\VoteList.svelte generated by Svelte v3.42.1 */
    const file$1 = "src\\components\\VoteList.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[16] = list[i];
    	child_ctx[18] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[19] = list[i];
    	child_ctx[21] = i;
    	return child_ctx;
    }

    // (85:4) {:else}
    function create_else_block(ctx) {
    	let div;
    	let formvote;
    	let current;

    	formvote = new FormVote({
    			props: {
    				vote: /*$vtList*/ ctx[2][/*current*/ ctx[1]]
    			},
    			$$inline: true
    		});

    	formvote.$on("cancel", /*cancelChanges*/ ctx[10]);
    	formvote.$on("update", /*update_handler*/ ctx[15]);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(formvote.$$.fragment);
    			attr_dev(div, "class", "containerForm svelte-piinmm");
    			add_location(div, file$1, 85, 8, 2429);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(formvote, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const formvote_changes = {};
    			if (dirty & /*$vtList, current*/ 6) formvote_changes.vote = /*$vtList*/ ctx[2][/*current*/ ctx[1]];
    			formvote.$set(formvote_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formvote.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formvote.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(formvote);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(85:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (83:30) 
    function create_if_block_2(ctx) {
    	let cardvotacao;
    	let current;

    	cardvotacao = new CardVotacao({
    			props: {
    				statement: /*$vtList*/ ctx[2][/*current*/ ctx[1]].statement,
    				options: /*options*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(cardvotacao.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(cardvotacao, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const cardvotacao_changes = {};
    			if (dirty & /*$vtList, current*/ 6) cardvotacao_changes.statement = /*$vtList*/ ctx[2][/*current*/ ctx[1]].statement;
    			cardvotacao.$set(cardvotacao_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardvotacao.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cardvotacao.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cardvotacao, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(83:30) ",
    		ctx
    	});

    	return block;
    }

    // (50:4) {#if mode === "view"}
    function create_if_block(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let button;
    	let t2;
    	let current;

    	button = new Button({
    			props: {
    				color: "primary",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button.$on("click", /*click_handler*/ ctx[11]);
    	let each_value = /*$vtList*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Votações";
    			t1 = space();
    			create_component(button.$$.fragment);
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$1, 51, 12, 1140);
    			attr_dev(div, "class", "containerList svelte-piinmm");
    			add_location(div, file$1, 50, 8, 1099);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			mount_component(button, div, null);
    			append_dev(div, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);

    			if (dirty & /*$vtList, showVote, removeVote, editVote*/ 452) {
    				each_value = /*$vtList*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(50:4) {#if mode === \\\"view\\\"}",
    		ctx
    	});

    	return block;
    }

    // (53:12) <Button color="primary" on:click={(e) => addVote()}                  >
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Criar votação");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(53:12) <Button color=\\\"primary\\\" on:click={(e) => addVote()}                  >",
    		ctx
    	});

    	return block;
    }

    // (61:20) <Button color="warning" on:click={(e) => editVote(index)}                          >
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Edita");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(61:20) <Button color=\\\"warning\\\" on:click={(e) => editVote(index)}                          >",
    		ctx
    	});

    	return block;
    }

    // (64:20) <Button color="danger" on:click={(e) => removeVote(index)}                          >
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Remove");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(64:20) <Button color=\\\"danger\\\" on:click={(e) => removeVote(index)}                          >",
    		ctx
    	});

    	return block;
    }

    // (67:20) <Button color="success" on:click={(e) => showVote(index)}                          >
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Mostrar");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(67:20) <Button color=\\\"success\\\" on:click={(e) => showVote(index)}                          >",
    		ctx
    	});

    	return block;
    }

    // (75:28) {#if i < vote.options.length - 1}
    function create_if_block_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "/";
    			add_location(span, file$1, 75, 32, 2129);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(75:28) {#if i < vote.options.length - 1}",
    		ctx
    	});

    	return block;
    }

    // (72:20) {#each vote.options as o, i}
    function create_each_block_1(ctx) {
    	let span;
    	let t0_value = /*o*/ ctx[19] + "";
    	let t0;
    	let t1;
    	let if_block = /*i*/ ctx[21] < /*vote*/ ctx[16].options.length - 1 && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			add_location(span, file$1, 72, 24, 1993);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			if (if_block) if_block.m(span, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$vtList*/ 4 && t0_value !== (t0_value = /*o*/ ctx[19] + "")) set_data_dev(t0, t0_value);

    			if (/*i*/ ctx[21] < /*vote*/ ctx[16].options.length - 1) {
    				if (if_block) ; else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(span, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(72:20) {#each vote.options as o, i}",
    		ctx
    	});

    	return block;
    }

    // (57:12) {#each $vtList as vote, index}
    function create_each_block(ctx) {
    	let p;
    	let b0;
    	let t1;
    	let t2_value = /*vote*/ ctx[16].statement + "";
    	let t2;
    	let t3;
    	let button0;
    	let t4;
    	let button1;
    	let t5;
    	let button2;
    	let t6;
    	let br;
    	let t7;
    	let b1;
    	let t9;
    	let t10;
    	let current;

    	function click_handler_1(...args) {
    		return /*click_handler_1*/ ctx[12](/*index*/ ctx[18], ...args);
    	}

    	button0 = new Button({
    			props: {
    				color: "warning",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", click_handler_1);

    	function click_handler_2(...args) {
    		return /*click_handler_2*/ ctx[13](/*index*/ ctx[18], ...args);
    	}

    	button1 = new Button({
    			props: {
    				color: "danger",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", click_handler_2);

    	function click_handler_3(...args) {
    		return /*click_handler_3*/ ctx[14](/*index*/ ctx[18], ...args);
    	}

    	button2 = new Button({
    			props: {
    				color: "success",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2.$on("click", click_handler_3);
    	let each_value_1 = /*vote*/ ctx[16].options;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			b0 = element("b");
    			b0.textContent = "Enunciado:";
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			create_component(button0.$$.fragment);
    			t4 = space();
    			create_component(button1.$$.fragment);
    			t5 = space();
    			create_component(button2.$$.fragment);
    			t6 = space();
    			br = element("br");
    			t7 = space();
    			b1 = element("b");
    			b1.textContent = "Opções:";
    			t9 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t10 = space();
    			add_location(b0, file$1, 58, 20, 1366);
    			add_location(br, file$1, 69, 20, 1874);
    			add_location(b1, file$1, 70, 20, 1902);
    			add_location(p, file$1, 57, 16, 1341);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, b0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			mount_component(button0, p, null);
    			append_dev(p, t4);
    			mount_component(button1, p, null);
    			append_dev(p, t5);
    			mount_component(button2, p, null);
    			append_dev(p, t6);
    			append_dev(p, br);
    			append_dev(p, t7);
    			append_dev(p, b1);
    			append_dev(p, t9);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(p, null);
    			}

    			append_dev(p, t10);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*$vtList*/ 4) && t2_value !== (t2_value = /*vote*/ ctx[16].statement + "")) set_data_dev(t2, t2_value);
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 4194304) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);

    			if (dirty & /*$vtList*/ 4) {
    				each_value_1 = /*vote*/ ctx[16].options;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(p, t10);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			destroy_component(button0);
    			destroy_component(button1);
    			destroy_component(button2);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(57:12) {#each $vtList as vote, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block, create_if_block_2, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*mode*/ ctx[0] === "view") return 0;
    		if (/*mode*/ ctx[0] === "show") return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			add_location(div, file$1, 48, 0, 1057);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $vtList;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VoteList', slots, []);
    	let mode = "view";
    	let current = 0;
    	let options = [];
    	let vtList = createVoteList();
    	validate_store(vtList, 'vtList');
    	component_subscribe($$self, vtList, value => $$invalidate(2, $vtList = value));

    	function addVote() {
    		vtList.create();
    		$$invalidate(1, current = $vtList.length - 1);
    		$$invalidate(0, mode = "add");
    	}

    	function editVote(index) {
    		$$invalidate(1, current = index);
    		$$invalidate(0, mode = "edit");
    	}

    	function removeVote(index) {
    		vtList.remove(index);
    	}

    	function showVote(index) {
    		$$invalidate(1, current = index);

    		$vtList[current].options.forEach(o => {
    			options.push({ option: o, count: 0 });
    		});

    		$$invalidate(0, mode = "show");
    	}

    	function updateChanges({ detail }) {
    		vtList.change(detail, current);
    		$$invalidate(0, mode = "view");
    	}

    	function cancelChanges() {
    		$$invalidate(0, mode = "view");
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VoteList> was created with unknown prop '${key}'`);
    	});

    	const click_handler = e => addVote();
    	const click_handler_1 = (index, e) => editVote(index);
    	const click_handler_2 = (index, e) => removeVote(index);
    	const click_handler_3 = (index, e) => showVote(index);
    	const update_handler = e => updateChanges(e);

    	$$self.$capture_state = () => ({
    		FormVote,
    		CardVotacao,
    		Button,
    		voteList,
    		createVoteList,
    		mode,
    		current,
    		options,
    		vtList,
    		addVote,
    		editVote,
    		removeVote,
    		showVote,
    		updateChanges,
    		cancelChanges,
    		$vtList
    	});

    	$$self.$inject_state = $$props => {
    		if ('mode' in $$props) $$invalidate(0, mode = $$props.mode);
    		if ('current' in $$props) $$invalidate(1, current = $$props.current);
    		if ('options' in $$props) $$invalidate(3, options = $$props.options);
    		if ('vtList' in $$props) $$invalidate(4, vtList = $$props.vtList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		mode,
    		current,
    		$vtList,
    		options,
    		vtList,
    		addVote,
    		editVote,
    		removeVote,
    		showVote,
    		updateChanges,
    		cancelChanges,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		update_handler
    	];
    }

    class VoteList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VoteList",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.42.1 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let h1;
    	let t1;
    	let votelist;
    	let current;
    	votelist = new VoteList({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			h1 = element("h1");
    			h1.textContent = "Svelte";
    			t1 = space();
    			create_component(votelist.$$.fragment);
    			attr_dev(h1, "class", "svelte-1cd7kk0");
    			add_location(h1, file, 5, 4, 105);
    			attr_dev(main, "class", "ola svelte-1cd7kk0");
    			add_location(main, file, 4, 0, 81);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(main, t1);
    			mount_component(votelist, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(votelist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(votelist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(votelist);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ VoteList });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
