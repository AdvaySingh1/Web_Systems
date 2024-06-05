
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
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
    function self(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function get_binding_group_value(group, __value, checked) {
        const value = new Set();
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.add(group[i].__value);
        }
        if (!checked) {
            value.delete(__value);
        }
        return Array.from(value);
    }
    function init_binding_group(group) {
        let _inputs;
        return {
            /* push */ p(...inputs) {
                _inputs = inputs;
                _inputs.forEach(input => group.push(input));
            },
            /* remove */ r() {
                _inputs.forEach(input => group.splice(group.indexOf(input), 1));
            }
        };
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
        if (value == null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value, mounting) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        if (!mounting || value !== undefined) {
            select.selectedIndex = -1; // no option should be selected
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked');
        return selected_option && selected_option.__value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
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
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
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
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
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
        seen_callbacks.clear();
        set_current_component(saved_component);
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
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
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
        else if (callback) {
            callback();
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
        const updates = [];
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
                // defer updates until all the DOM shuffling is done
                updates.push(() => block.p(child_ctx, dirty));
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
        run_all(updates);
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
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
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
            flush_render_callbacks($$.after_update);
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
            ctx: [],
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
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
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
            if (!is_function(callback)) {
                return noop;
            }
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
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
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
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
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
        if (text.data === data)
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

    /* src/globe.svelte generated by Svelte v3.59.2 */

    const file$3 = "src/globe.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (21:8) {:else}
    function create_else_block_1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "There's no people.";
    			add_location(p, file$3, 21, 12, 752);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(21:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (17:12) {#if person.beltColour == "black"}
    function create_if_block_2(ctx) {
    	let p;
    	let strong;

    	const block = {
    		c: function create() {
    			p = element("p");
    			strong = element("strong");
    			strong.textContent = "Black Belt.";
    			add_location(strong, file$3, 17, 19, 658);
    			add_location(p, file$3, 17, 16, 655);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, strong);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(17:12) {#if person.beltColour == \\\"black\\\"}",
    		ctx
    	});

    	return block;
    }

    // (13:4) {#each people as person (person.id)}
    function create_each_block(key_1, ctx) {
    	let div;
    	let p;
    	let t0_value = /*person*/ ctx[5].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*person*/ ctx[5].beltColour + "";
    	let t2;
    	let t3;
    	let t4_value = /*person*/ ctx[5].age + "";
    	let t4;
    	let t5;
    	let button;
    	let t7;
    	let mounted;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[3](/*person*/ ctx[5], ...args);
    	}

    	let if_block = /*person*/ ctx[5].beltColour == "black" && create_if_block_2(ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = text("'s faveriote beltColor is ");
    			t2 = text(t2_value);
    			t3 = text(" and age is ");
    			t4 = text(t4_value);
    			t5 = space();
    			button = element("button");
    			button.textContent = "delete";
    			t7 = space();
    			if (if_block) if_block.c();
    			add_location(p, file$3, 14, 12, 405);
    			attr_dev(button, "class", "deleter");
    			add_location(button, file$3, 15, 12, 507);
    			add_location(div, file$3, 13, 8, 387);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    			append_dev(div, t5);
    			append_dev(div, button);
    			append_dev(div, t7);
    			if (if_block) if_block.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler, false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*people*/ 1 && t0_value !== (t0_value = /*person*/ ctx[5].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*people*/ 1 && t2_value !== (t2_value = /*person*/ ctx[5].beltColour + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*people*/ 1 && t4_value !== (t4_value = /*person*/ ctx[5].age + "")) set_data_dev(t4, t4_value);

    			if (/*person*/ ctx[5].beltColour == "black") {
    				if (if_block) ; else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(13:4) {#each people as person (person.id)}",
    		ctx
    	});

    	return block;
    }

    // (32:12) {:else}
    function create_else_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Little number!";
    			add_location(p, file$3, 32, 16, 1061);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(32:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (30:33) 
    function create_if_block_1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Number between 5 and 10";
    			add_location(p, file$3, 30, 16, 994);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(30:33) ",
    		ctx
    	});

    	return block;
    }

    // (28:12) {#if number > 10}
    function create_if_block$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Number greater than 10";
    			add_location(p, file$3, 28, 16, 914);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(28:12) {#if number > 10}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let main;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t0;
    	let div;
    	let input;
    	let t1;
    	let mounted;
    	let dispose;
    	let each_value = /*people*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*person*/ ctx[5].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block_1(ctx);
    	}

    	function select_block_type(ctx, dirty) {
    		if (/*number*/ ctx[1] > 10) return create_if_block$1;
    		if (/*number*/ ctx[1] > 5) return create_if_block_1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			t0 = space();
    			div = element("div");
    			input = element("input");
    			t1 = text(";\n            ");
    			if_block.c();
    			attr_dev(input, "type", "number");
    			attr_dev(input, "title", "Number");
    			add_location(input, file$3, 26, 8, 810);
    			add_location(div, file$3, 23, 4, 794);
    			attr_dev(main, "class", "svelte-cnaowv");
    			add_location(main, file$3, 11, 0, 331);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				if (each_blocks[i]) {
    					each_blocks[i].m(main, null);
    				}
    			}

    			if (each_1_else) {
    				each_1_else.m(main, null);
    			}

    			append_dev(main, t0);
    			append_dev(main, div);
    			append_dev(div, input);
    			set_input_value(input, /*number*/ ctx[1]);
    			append_dev(div, t1);
    			if_block.m(div, null);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*people, handlePClick*/ 5) {
    				each_value = /*people*/ ctx[0];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, main, destroy_block, create_each_block, t0, get_each_context);

    				if (!each_value.length && each_1_else) {
    					each_1_else.p(ctx, dirty);
    				} else if (!each_value.length) {
    					each_1_else = create_else_block_1(ctx);
    					each_1_else.c();
    					each_1_else.m(main, t0);
    				} else if (each_1_else) {
    					each_1_else.d(1);
    					each_1_else = null;
    				}
    			}

    			if (dirty & /*number*/ 2 && to_number(input.value) !== /*number*/ ctx[1]) {
    				set_input_value(input, /*number*/ ctx[1]);
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (each_1_else) each_1_else.d();
    			if_block.d();
    			mounted = false;
    			dispose();
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
    	validate_slots('Globe', slots, []);

    	let people = [
    		{
    			name: 'yoshi',
    			beltColour: 'black',
    			age: 25,
    			id: 1
    		},
    		{
    			name: 'mario',
    			beltColour: 'orange',
    			age: 45,
    			id: 2
    		},
    		{
    			name: 'luigi',
    			beltColour: 'brown',
    			age: 35,
    			id: 3
    		}
    	];

    	let number;

    	const handlePClick = (e, id) => {
    		$$invalidate(0, people = people.filter(person => person.id != id));
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Globe> was created with unknown prop '${key}'`);
    	});

    	const click_handler = (person, e) => handlePClick(e, person.id);

    	function input_input_handler() {
    		number = to_number(this.value);
    		$$invalidate(1, number);
    	}

    	$$self.$capture_state = () => ({ people, number, handlePClick });

    	$$self.$inject_state = $$props => {
    		if ('people' in $$props) $$invalidate(0, people = $$props.people);
    		if ('number' in $$props) $$invalidate(1, number = $$props.number);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [people, number, handlePClick, click_handler, input_input_handler];
    }

    class Globe extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Globe",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Model.svelte generated by Svelte v3.59.2 */

    const file$2 = "src/Model.svelte";

    // (8:0) {#if showModel}
    function create_if_block(ctx) {
    	let div1;
    	let div0;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "model svelte-1wac0fu");
    			toggle_class(div0, "promo", /*isPromo*/ ctx[1]);
    			add_location(div0, file$2, 10, 8, 253);
    			attr_dev(div1, "class", "backdrop svelte-1wac0fu");
    			add_location(div1, file$2, 9, 4, 207);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", self(/*click_handler*/ ctx[5]), false, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*isPromo*/ 2) {
    				toggle_class(div0, "promo", /*isPromo*/ ctx[1]);
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
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(8:0) {#if showModel}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*showModel*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showModel*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*showModel*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
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
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
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
    	validate_slots('Model', slots, ['default']);
    	let { showModel = false } = $$props;
    	let { promoMsg = 'default msg' } = $$props;
    	let { isPromo = false } = $$props;
    	const writable_props = ['showModel', 'promoMsg', 'isPromo'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Model> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('showModel' in $$props) $$invalidate(0, showModel = $$props.showModel);
    		if ('promoMsg' in $$props) $$invalidate(2, promoMsg = $$props.promoMsg);
    		if ('isPromo' in $$props) $$invalidate(1, isPromo = $$props.isPromo);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ showModel, promoMsg, isPromo });

    	$$self.$inject_state = $$props => {
    		if ('showModel' in $$props) $$invalidate(0, showModel = $$props.showModel);
    		if ('promoMsg' in $$props) $$invalidate(2, promoMsg = $$props.promoMsg);
    		if ('isPromo' in $$props) $$invalidate(1, isPromo = $$props.isPromo);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [showModel, isPromo, promoMsg, $$scope, slots, click_handler];
    }

    class Model extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { showModel: 0, promoMsg: 2, isPromo: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Model",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get showModel() {
    		throw new Error("<Model>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showModel(value) {
    		throw new Error("<Model>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get promoMsg() {
    		throw new Error("<Model>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set promoMsg(value) {
    		throw new Error("<Model>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isPromo() {
    		throw new Error("<Model>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isPromo(value) {
    		throw new Error("<Model>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Form.svelte generated by Svelte v3.59.2 */

    const { console: console_1 } = globals;
    const file$1 = "src/Form.svelte";

    function create_fragment$1(ctx) {
    	let form;
    	let input0;
    	let t0;
    	let input1;
    	let t1;
    	let label0;
    	let t3;
    	let input2;
    	let t4;
    	let br;
    	let t5;
    	let label1;
    	let t7;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;
    	let t12;
    	let button;
    	let binding_group;
    	let mounted;
    	let dispose;
    	binding_group = init_binding_group(/*$$binding_groups*/ ctx[8][0]);

    	const block = {
    		c: function create() {
    			form = element("form");
    			input0 = element("input");
    			t0 = space();
    			input1 = element("input");
    			t1 = space();
    			label0 = element("label");
    			label0.textContent = "Skills";
    			t3 = space();
    			input2 = element("input");
    			t4 = text("Being Cool");
    			br = element("br");
    			t5 = space();
    			label1 = element("label");
    			label1.textContent = "Belt Color";
    			t7 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Orange";
    			option1 = element("option");
    			option1.textContent = "Brown";
    			option2 = element("option");
    			option2.textContent = "Black";
    			option3 = element("option");
    			option3.textContent = "White";
    			t12 = space();
    			button = element("button");
    			button.textContent = "Add Ninja";
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "name");
    			add_location(input0, file$1, 19, 8, 456);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "placeholder", "age");
    			add_location(input1, file$1, 20, 8, 521);
    			attr_dev(label0, "for", "skills");
    			add_location(label0, file$1, 21, 8, 586);
    			attr_dev(input2, "type", "checkbox");
    			input2.__value = "cool";
    			input2.value = input2.__value;
    			add_location(input2, file$1, 22, 8, 629);
    			add_location(br, file$1, 22, 74, 695);
    			attr_dev(label1, "for", "belts");
    			add_location(label1, file$1, 23, 8, 708);
    			option0.__value = "orange";
    			option0.value = option0.__value;
    			add_location(option0, file$1, 25, 12, 798);
    			option1.__value = "brown";
    			option1.value = option1.__value;
    			add_location(option1, file$1, 26, 12, 849);
    			option2.__value = "black";
    			option2.value = option2.__value;
    			add_location(option2, file$1, 27, 12, 898);
    			option3.__value = "white";
    			option3.value = option3.__value;
    			add_location(option3, file$1, 28, 12, 947);
    			if (/*beltColor*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[9].call(select));
    			add_location(select, file$1, 24, 8, 754);
    			add_location(button, file$1, 30, 8, 1010);
    			add_location(form, file$1, 18, 4, 401);
    			binding_group.p(input2);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, input0);
    			set_input_value(input0, /*name*/ ctx[0]);
    			append_dev(form, t0);
    			append_dev(form, input1);
    			set_input_value(input1, /*age*/ ctx[2]);
    			append_dev(form, t1);
    			append_dev(form, label0);
    			append_dev(form, t3);
    			append_dev(form, input2);
    			input2.checked = ~(/*skills*/ ctx[3] || []).indexOf(input2.__value);
    			append_dev(form, t4);
    			append_dev(form, br);
    			append_dev(form, t5);
    			append_dev(form, label1);
    			append_dev(form, t7);
    			append_dev(form, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(select, option3);
    			select_option(select, /*beltColor*/ ctx[1], true);
    			append_dev(form, t12);
    			append_dev(form, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[5]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[6]),
    					listen_dev(input2, "change", /*input2_change_handler*/ ctx[7]),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[9]),
    					listen_dev(form, "submit", prevent_default(/*handleSubmit*/ ctx[4]), false, true, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 1 && input0.value !== /*name*/ ctx[0]) {
    				set_input_value(input0, /*name*/ ctx[0]);
    			}

    			if (dirty & /*age*/ 4 && to_number(input1.value) !== /*age*/ ctx[2]) {
    				set_input_value(input1, /*age*/ ctx[2]);
    			}

    			if (dirty & /*skills*/ 8) {
    				input2.checked = ~(/*skills*/ ctx[3] || []).indexOf(input2.__value);
    			}

    			if (dirty & /*beltColor*/ 2) {
    				select_option(select, /*beltColor*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			binding_group.r();
    			mounted = false;
    			run_all(dispose);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Form', slots, []);
    	let name;
    	let beltColor;
    	let age;
    	let skills = [];

    	const handleSubmit = () => {
    		console.log(name, beltColor, age);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Form> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	function input1_input_handler() {
    		age = to_number(this.value);
    		$$invalidate(2, age);
    	}

    	function input2_change_handler() {
    		skills = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
    		$$invalidate(3, skills);
    	}

    	function select_change_handler() {
    		beltColor = select_value(this);
    		$$invalidate(1, beltColor);
    	}

    	$$self.$capture_state = () => ({
    		name,
    		beltColor,
    		age,
    		skills,
    		handleSubmit
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('beltColor' in $$props) $$invalidate(1, beltColor = $$props.beltColor);
    		if ('age' in $$props) $$invalidate(2, age = $$props.age);
    		if ('skills' in $$props) $$invalidate(3, skills = $$props.skills);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		beltColor,
    		age,
    		skills,
    		handleSubmit,
    		input0_input_handler,
    		input1_input_handler,
    		input2_change_handler,
    		$$binding_groups,
    		select_change_handler
    	];
    }

    class Form extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Form",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.59.2 */
    const file = "src/App.svelte";

    // (31:0) <Model {showModel} on:click={togglePromo}>
    function create_default_slot(ctx) {
    	let form;
    	let current;
    	form = new Form({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(form.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(form, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(form, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(31:0) <Model {showModel} on:click={togglePromo}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let model;
    	let t0;
    	let main;
    	let h1;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let p;
    	let t5;
    	let t6;
    	let t7;
    	let t8;
    	let button0;
    	let t10;
    	let input0;
    	let t11;
    	let label0;
    	let t13;
    	let input1;
    	let t14;
    	let label1;
    	let t16;
    	let input2;
    	let t17;
    	let div;
    	let button1;
    	let t19;
    	let globe;
    	let current;
    	let mounted;
    	let dispose;

    	model = new Model({
    			props: {
    				showModel: /*showModel*/ ctx[4],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	model.$on("click", /*togglePromo*/ ctx[5]);
    	globe = new Globe({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(model.$$.fragment);
    			t0 = space();
    			main = element("main");
    			h1 = element("h1");
    			t1 = text("Hello ");
    			t2 = text(/*fullName*/ ctx[2]);
    			t3 = text("!");
    			t4 = space();
    			p = element("p");
    			t5 = text("This the color is ");
    			t6 = text(/*color*/ ctx[3]);
    			t7 = text(".");
    			t8 = space();
    			button0 = element("button");
    			button0.textContent = "Change color";
    			t10 = space();
    			input0 = element("input");
    			t11 = space();
    			label0 = element("label");
    			label0.textContent = "First Name";
    			t13 = space();
    			input1 = element("input");
    			t14 = space();
    			label1 = element("label");
    			label1.textContent = "Last Name";
    			t16 = space();
    			input2 = element("input");
    			t17 = space();
    			div = element("div");
    			button1 = element("button");
    			button1.textContent = "Show Promo";
    			t19 = space();
    			create_component(globe.$$.fragment);
    			set_style(h1, "background-color", /*color*/ ctx[3]);
    			attr_dev(h1, "class", "svelte-1qxaw98");
    			add_location(h1, file, 46, 1, 950);
    			add_location(p, file, 47, 1, 1011);
    			add_location(button0, file, 48, 1, 1046);
    			attr_dev(input0, "title", "color");
    			attr_dev(input0, "type", "text");
    			add_location(input0, file, 50, 1, 1156);
    			attr_dev(label0, "for", "fn");
    			add_location(label0, file, 51, 1, 1210);
    			attr_dev(input1, "id", "fn");
    			attr_dev(input1, "title", "First Name");
    			attr_dev(input1, "type", "text");
    			add_location(input1, file, 52, 1, 1246);
    			attr_dev(label1, "for", "ln");
    			add_location(label1, file, 53, 1, 1316);
    			attr_dev(input2, "id", "ln");
    			attr_dev(input2, "title", "Last Name");
    			attr_dev(input2, "type", "text");
    			add_location(input2, file, 54, 1, 1351);
    			add_location(button1, file, 56, 2, 1444);
    			attr_dev(div, "class", "model_btn");
    			add_location(div, file, 55, 1, 1418);
    			attr_dev(main, "class", "svelte-1qxaw98");
    			add_location(main, file, 45, 0, 942);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(model, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, h1);
    			append_dev(h1, t1);
    			append_dev(h1, t2);
    			append_dev(h1, t3);
    			append_dev(main, t4);
    			append_dev(main, p);
    			append_dev(p, t5);
    			append_dev(p, t6);
    			append_dev(p, t7);
    			append_dev(main, t8);
    			append_dev(main, button0);
    			append_dev(main, t10);
    			append_dev(main, input0);
    			set_input_value(input0, /*color*/ ctx[3]);
    			append_dev(main, t11);
    			append_dev(main, label0);
    			append_dev(main, t13);
    			append_dev(main, input1);
    			set_input_value(input1, /*firstName*/ ctx[0]);
    			append_dev(main, t14);
    			append_dev(main, label1);
    			append_dev(main, t16);
    			append_dev(main, input2);
    			set_input_value(input2, /*lastName*/ ctx[1]);
    			append_dev(main, t17);
    			append_dev(main, div);
    			append_dev(div, button1);
    			insert_dev(target, t19, anchor);
    			mount_component(globe, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*changeColorBlue*/ ctx[6], false, false, false, false),
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[8]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[9]),
    					listen_dev(button1, "click", /*togglePromo*/ ctx[5], { once: true }, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const model_changes = {};
    			if (dirty & /*showModel*/ 16) model_changes.showModel = /*showModel*/ ctx[4];

    			if (dirty & /*$$scope*/ 2048) {
    				model_changes.$$scope = { dirty, ctx };
    			}

    			model.$set(model_changes);
    			if (!current || dirty & /*fullName*/ 4) set_data_dev(t2, /*fullName*/ ctx[2]);

    			if (!current || dirty & /*color*/ 8) {
    				set_style(h1, "background-color", /*color*/ ctx[3]);
    			}

    			if (!current || dirty & /*color*/ 8) set_data_dev(t6, /*color*/ ctx[3]);

    			if (dirty & /*color*/ 8 && input0.value !== /*color*/ ctx[3]) {
    				set_input_value(input0, /*color*/ ctx[3]);
    			}

    			if (dirty & /*firstName*/ 1 && input1.value !== /*firstName*/ ctx[0]) {
    				set_input_value(input1, /*firstName*/ ctx[0]);
    			}

    			if (dirty & /*lastName*/ 2 && input2.value !== /*lastName*/ ctx[1]) {
    				set_input_value(input2, /*lastName*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(model.$$.fragment, local);
    			transition_in(globe.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(model.$$.fragment, local);
    			transition_out(globe.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(model, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			if (detaching) detach_dev(t19);
    			destroy_component(globe, detaching);
    			mounted = false;
    			run_all(dispose);
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
    	let firstName = '';
    	let lastName = '';
    	let fullName = '';
    	let color = '';
    	let showModel = false;

    	//let showForm = false;
    	//event forwarding
    	const togglePromo = () => {
    		$$invalidate(4, showModel = !showModel);
    	};

    	// slots
    	// event handlers
    	function changeColorBlue(e) {
    		$$invalidate(3, color = 'blue');
    	}

    	const changeColor = e => {
    		$$invalidate(3, color = e.target.value);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		color = this.value;
    		$$invalidate(3, color);
    	}

    	function input1_input_handler() {
    		firstName = this.value;
    		$$invalidate(0, firstName);
    	}

    	function input2_input_handler() {
    		lastName = this.value;
    		$$invalidate(1, lastName);
    	}

    	$$self.$capture_state = () => ({
    		Globe,
    		Model,
    		Form,
    		firstName,
    		lastName,
    		fullName,
    		color,
    		showModel,
    		togglePromo,
    		changeColorBlue,
    		changeColor
    	});

    	$$self.$inject_state = $$props => {
    		if ('firstName' in $$props) $$invalidate(0, firstName = $$props.firstName);
    		if ('lastName' in $$props) $$invalidate(1, lastName = $$props.lastName);
    		if ('fullName' in $$props) $$invalidate(2, fullName = $$props.fullName);
    		if ('color' in $$props) $$invalidate(3, color = $$props.color);
    		if ('showModel' in $$props) $$invalidate(4, showModel = $$props.showModel);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*firstName, lastName*/ 3) {
    			//reactive values
    			$$invalidate(2, fullName = `${firstName} ${lastName}`);
    		}
    	};

    	return [
    		firstName,
    		lastName,
    		fullName,
    		color,
    		showModel,
    		togglePromo,
    		changeColorBlue,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler
    	];
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
        props: {
            name: 'neha'
        }
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
